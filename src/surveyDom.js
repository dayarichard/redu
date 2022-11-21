import  { useState } from "react";
import "../associate_forms/associate_form.scss";
import LogoBlackSvg from "../../assets/images/Logo-Black.svg";
import apiRes from "../../assets/temporary/CustomerForm.json";
import DashboardLeftSection from "../../assets/common/DashboardLeftSection";

function AssociateForm() {
  const [inputValues, setInputValues] = useState<any>({});
  const [errorArray, setErrorArray] = useState<any>([]);

  const framingErrObj = (sourceData: Array<any>, errData: any) => {
    let errIdList: any = errData;
    sourceData.map((question: any) => {
      if (question.is_required) {
        if (!inputValues[question.question_id]) {
          // case when user not entered the mandatory question
          errIdList.push(question.question_id);
        } else if (
          question.is_comment_required &&
          !inputValues[question.question_id].comment
        ) {
          // case when user not entered the mandatory comment
          errIdList.push(question.question_id);
        } else {
          // answer was filled by user for mandatory question
          null;
        }
      }
      if (question?.sub_question?.length > 0) {
        framingErrObj(question?.sub_question, errIdList);
      }
    });
    return errIdList;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const errQuestionIds = framingErrObj(apiRes.data, []);
    setErrorArray(errQuestionIds);
    if (errQuestionIds.length > 0) {
      // error was there
    } else {
      // call submit api
    }
  };

  const renderInput = (inputObj: any, isSubQuestion?: boolean) => {
    const inputType = checkInput(inputObj);
    switch (inputType) {
      case "INPUT_RADIO": {
        return renderRadioInput(inputObj, isSubQuestion);
      }
      case "INPUT_STAR": {
        return renderStarInput(inputObj, isSubQuestion);
      }
      case "INPUT_TEXT": {
        return renderTextInput(inputObj, isSubQuestion);
      }
      default:
        // for subQuestion's parent question, as it is not coming under any category
        return <p className="title">{inputObj.question}</p>;
    }
  };

  const checkInput = (inputObj: any) => {
    if (inputObj.is_rated || inputObj.has_rating) {
      return "INPUT_STAR";
    } else if (inputObj.option_response.length > 1 && !inputObj.is_rated) {
      return "INPUT_RADIO";
    } else if (inputObj.has_comment) {
      return "INPUT_TEXT";
    }
  };

  const handleRadioInput = (
    questionID: string,
    eve?: any,
    comment?: string
  ) => {
    let radioValues: any = Object.assign({}, inputValues);
    let changedQuestion = radioValues[questionID];
    if (changedQuestion) {
      if (eve) {
        changedQuestion.value = eve.target.value;
      } else if (comment !== null) {
        changedQuestion.comment = comment;
      }
      radioValues[questionID] = changedQuestion;
    } else {
      radioValues[questionID] = {
        question_id: questionID,
        value: eve?.target?.value,
        comment: comment || "",
      };
    }
    setInputValues(radioValues);
  };

  const renderSubComment = (questionObj: any) => {
    return (
      <div className="inputFontColor mt-15">
        <textarea
          onChange={(eve) => {
            handleRadioInput(questionObj.question_id, null, eve.target.value); // comment is null
          }}
          name="project_execution_comment"
          placeholder={
            questionObj.is_comment_required ? "Comment" : "Comment (optional)"
          }
        ></textarea>
      </div>
    );
  };

  const renderRadioInput = (questionObj: any, isSubQuestion?: boolean) => {
    return (
      <>
        <p className="title">
          {questionObj.question}
          {questionObj.is_required && <span>*</span>}
        </p>
        <div className="radio-btn">
          {questionObj.option_response.map((eachOption: any) => {
            return (
              <div key={eachOption.order_id} className="yesNoOption">
                <input
                  type="radio"
                  onChange={(eve) => {
                    handleRadioInput(eachOption.question_id, eve);
                  }}
                  value={eachOption.option}
                  name={eachOption.question_id}
                  id={
                    eachOption.question_id.toString() +
                    eachOption.order_id.toString()
                  }
                />
                <label
                  htmlFor={
                    eachOption.question_id.toString() +
                    eachOption.order_id.toString()
                  }
                >
                  {eachOption.option}
                </label>
              </div>
            );
          })}
        </div>
        {questionObj.has_comment && renderSubComment(questionObj)}
        {errorArray?.includes(questionObj.question_id) && (
          <label className="warningText">Please fill out this field.</label>
        )}
      </>
    );
  };

  const renderStarInput = (questionObj: any, isSubQuestion?: boolean) => {
    return (
      <>
        {/* toDo : change P tag based on subQuestion */}
        <p className="title">{questionObj.question}</p>
        <div className="star-rating__stars">
          {(questionObj.option_response || []).map(
            (eachOption: any, index: number) => (
              <>
                <input
                  key={
                    eachOption.question_id.toString() +
                    eachOption.order_id.toString()
                  }
                  className="star-rating__input"
                  type="radio"
                  id={
                    eachOption.question_id.toString() +
                    eachOption.order_id.toString()
                  }
                  name={eachOption.question_id}
                  value={eachOption.option}
                  onChange={(eve) => {
                    handleRadioInput(eachOption.question_id, eve); // comment is null
                  }}
                />
                <label
                  title={eachOption.rating}
                  htmlFor={
                    eachOption.question_id.toString() +
                    eachOption.order_id.toString()
                  }
                  className="star-rating__label"
                ></label>
              </>
            )
          )}
        </div>
        <p className="rate_txt ">
          (1 Poor, 2 Average, 3 Satisfied, 4 Good, 5 I am impressed)
        </p>

        {questionObj.has_comment && renderSubComment(questionObj)}
        {errorArray?.includes(questionObj.question_id) && (
          <label className="warningText">Please fill out this field.</label>
        )}
      </>
    );
  };

  const handleTextInput = (questionID: number, value: string) => {
    let textValues: any = Object.assign({}, inputValues);
    let changedQuestion = textValues[questionID];
    if (changedQuestion) {
      textValues[questionID].comment = value;
    } else {
      textValues[questionID] = {
        question_id: questionID,
        value: "",
        comment: value,
      };
    }
    setInputValues(textValues);
  };

  const renderTextInput = (questionObj: any, isSubQuestion?: boolean) => {
    return (
      <div className="inputFontColor mt-15">
        <p className="title mb-15">{questionObj.question}</p>
        <textarea
          onChange={(eve) =>
            handleTextInput(questionObj.question_id, eve.target.value)
          }
          name={questionObj.question_id.toString()}
          placeholder={
            questionObj.is_comment_required ? "Comment" : "Comment (optional)"
          }
          style={{
            height:questionObj.question ==='Additional comment'?"140px":'40px'
          }}
        ></textarea>
      </div>
    );
  };

  const renderSubmit = () => {
    return (
      <div className="submit">
        <button type="submit" onClick={handleSubmit}>
          SUBMIT
        </button>
      </div>
    );
  };

  const renderQuestions = (inputData: Array<any>, isSubQuestion?: boolean) => {
    return inputData.map((inputObj: any, index: number) => {
      return (
        <div key={index}>
          <>
            {renderInput(inputObj, isSubQuestion)}
            {inputObj?.sub_question?.length > 0 &&
              renderQuestions(inputObj?.sub_question, true)}
          </>
        </div>
      );
    });
  };

  return (
    <>
      <div className="container">
        <DashboardLeftSection formTitle = 'ASSOCIATE SATISFACTION SURVEY - 2022' />
        <div className="rightSection">
          <form
            className="formoid-metro-red"
            name="form"
            id="myForm"
            onSubmit={(event) => handleSubmit(event)}
          >
            <div className="dashboard">
              <div className="header-title-content">
                <h2>Associate Performance Feedback Form - 2022</h2>
                <img src={LogoBlackSvg} alt="logo" />
              </div>
              <div className="dashboardSpacing">
                <div className="dashboardInnerSection">
                  <p className="wish_txt">
                    We would like to thank you for taking time out to
                    givefeedback.Detailed feedback would help us improve.
                  </p>
                  <div className="inputFontColor mb-15">
                    {/* <p className="title">Name of the Organization:<span>*</span></p> */}
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Name of the Organization *"
                    />
                    {/* <label className="warningText mt-2">Please fill out this field.</label> */}
                  </div>
                  <div className="inputFontColor mb-15">
                    {/* <p className="title">Name of the project:<span>*</span></p> */}
                    <input
                      type="text"
                      name="project_name"
                      placeholder="Name of the Reporting Manager *"
                    />
                    {/* <label className="warningText mt-2">Please fill out this field.</label> */}
                  </div>
                  <div className=" inputFontColor mb-15">
                    {/* <p className="title ">Point of contact at [x]cube LABS you have interacted with:<span */}
                    {/* className="text-red">*</span></p> */}
                    <input type="text" placeholder="Your Role *" />
                    {/* <label className="warningText">Please fill out this field.</label> */}
                  </div>
                  <div className=" inputFontColor mb-15">
                    {/* <p className="title ">Point of contact at [x]cube LABS you have interacted with:<span */}
                    {/* className="text-red">*</span></p> */}
                    <input
                      type="text"
                      placeholder="PurpleTalk Associate's Name *"
                    />
                    {/* <label className="warningText">Please fill out this field.</label> */}
                  </div>
                  {renderQuestions(apiRes.data)}

                  {renderSubmit()}
                </div>
              </div>
            </div>
          </form>
        </div>

      </div>
    </>
  );
}
export default AssociateForm;
