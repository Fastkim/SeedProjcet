import {Button, Col, Form, Row} from 'react-bootstrap'
import {useCallback, useState} from 'react';
import {useNavigate} from "react-router-dom";
import UserLayout from '../UserLayout';
import MyBackButton from "../navigation/02";
import UserCheckModal from "./UserCheckModal";
import {sendSMS, userSignUp, handleCheckDuplicate, fixUserPw} from "../../api/userApi";

const UserSignUp = () => {
    const [user, setUser] = useState({
        userName:'',
        userPw:'',
        userPwCheck:'',
        personalName:'',
        phoneNumber:'',
        birthDay:'',
        userEmail:'',
        checkSMS:''
    })


    const onChange = e => {
        user[e.target.name] = e.target.value
        setUser({...user})
    }

    const [data, setData] = useState(null)
    // 적은 휴대폰번호를 담아서 백엔드에 보내주는 함수
    const onClickSendPhoneNumber = useCallback(() => sendSMS(user.phoneNumber).then(data => {
        const cerNum = data;
        alert("인증번호가 전송되었습니다.")
        setData(cerNum)
    }), [user.phoneNumber]);

    const [isCheckSMS, setIsCheckSMS] = useState(false)
    const checkSMS = () => {
        if (data == user.checkSMS) {
            alert("휴대폰 인증이 정상적으로 완료되었습니다.")
            setIsCheckSMS(true)
        } else {
            alert("인증번호가 올바르지 않습니다.")
        }
    }

    // 유효성검사

    // 아이디, 이름, 이메일, 비밀번호, 비밀번호 확인, 휴대폰번호, 생년월일
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [birthDay, setBirthDay] = useState('')

    // 오류메시지 상태저장
    const [idMessage, setIdMessage] = useState('')
    const [nameMessage, setNameMessage] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')
    const [phoneNumberMessage, setPhoneNumberMessage] = useState('')
    const [birthDayMessage, setBirthDayMessage] = useState('')

    // 유효성 검사
    const [isId, setIsId] = useState(false)
    const [isName, setIsName] = useState(false)
    const [isEmail, setIsEmail] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
    const [isPhoneNumber, setIsPhoneNumber] = useState(false)
    const [isBirthDay, setIsBirthDay] = useState(false)
    const navigate = useNavigate()



    // user가 바뀔때마다 useCallback을 다시사용하여 렌더링을 다시하겠다.
    const onClickUserAdd = useCallback(() => {
        try {
            userSignUp(user)
                .then((data) => {
                    console.log('response:', data)
                    if(data.status === 200) {
                        navigate('/userCompleteSignUp')
                    }
                })
        } catch(err) {
            console.error(err)
        }
        },
        [user, navigate]
    )

    // 아이디
    const onChangeId = useCallback(e => {
        const idRegex = /^[a-zA-z0-9]{5,15}$/
        const idCurrent = e.target.value
        setId(idCurrent)

        if(!idRegex.test(idCurrent)) {
            setIdMessage('영문, 숫자 조합의 5자 이상 10자이내 형식을 맞춰주세요')
            setIsId(false)
        } else {
            setIdMessage('올바른 아이디 형식이에요 :)')
            setIsId(true)
        }
    }, []);

    // 이름
    const onChangeName = useCallback(e => {
        setName(e.target.value)
        if (e.target.value.length < 2 || e.target.value.length > 5) {
            setNameMessage('2글자 이상 5글자 미만으로 입력해주세요.')
            setIsName(false)
        } else {
            setNameMessage('올바른 이름 형식입니다 :)')
            setIsName(true)
        }
    }, []) // dependency가 없으므로 이전에 사용하던 함수값을 그대로 사용

    // 이메일
    const onChangeEmail = useCallback(e => {
        const emailRegex = //정규표현식
            /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
        const emailCurrent = e.target.value
        setEmail(emailCurrent)

        if (!emailRegex.test(emailCurrent)) {
            setEmailMessage('(영어소문자/숫자)@(소문자).(소문자 2,3자)형식을 맞춰주세요.')
            setIsEmail(false)
        } else {
            setEmailMessage('올바른 이메일 형식이에요 :')
            setIsEmail(true)
        }
    }, [])

    // 비밀번호
    const onChangePassword = useCallback(e => {
        const passwordRegex = /^[a-zA-z0-9ㄱ-ㅎ가-힣]{4,12}$/ // 영문, 숫자, 한글 조합 4~12자 이내
        const passwordCurrent = e.target.value
        setPassword(passwordCurrent)

        if(!passwordRegex.test(passwordCurrent)) {
            setPasswordMessage('영문,숫자,한글 조합의 4~12자리로 입력해주세요.')
            setIsPassword(false)
        } else {
            setPasswordMessage('안전한 비밀번호에요 :)')
            setIsPassword(true)
        }
    }, [])

    // 비밀번호 확인
    const onChangePasswordConfirm = useCallback(e => {
        const passwordConfirmCurrent = e.target.value
        setPasswordConfirm(passwordConfirmCurrent)

        if (password === passwordConfirmCurrent) {
            setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 :)')
            setIsPasswordConfirm(true)
        } else {
            setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요')
            setIsPasswordConfirm(false)
        }
    }, [password])

    // 휴대폰번호
    const onChangePhoneNumber = useCallback(e => {
        const phoneNumberRegex = /^[0-9]{10,11}$/ // 11자리의 숫자
        const phoneNumberCurrent = e.target.value
        setPhoneNumber(phoneNumberCurrent)

        if(!phoneNumberRegex.test(phoneNumberCurrent)) {
            setPhoneNumberMessage('10 ~ 11자리의 숫자로 입력해주세요.')
            setIsPhoneNumber(false)
        } else {
            setPhoneNumberMessage('올바른 휴대폰번호입니다. :)')
            setIsPhoneNumber(true)
        }
    }, [])

    const onChangeBirthDay = useCallback(e => {
        const birthDayRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/ // 11자리의 숫자
        const birthDayCurrent = e.target.value
        setBirthDay(birthDayCurrent)

        if(!birthDayRegex.test(birthDayCurrent)) {
            setBirthDayMessage('YYYY-MM-DD 형식으로 8자 입력해주세요.')
            setIsBirthDay(false)
        } else {
            setBirthDayMessage('올바른 형식의 생년월일입니다. :)')
            setIsBirthDay(true)
        }
    }, [])

    const [available, setAvailable] = useState(false);

    const userNameCheck = useCallback(() => {
        handleCheckDuplicate(user.userName)
            .then(response => {
                console.log("이건 받은값 :", response)
                if(response === true) {
                    alert("가능한 아이디입니다.")
                    setAvailable(true);
                } else if(response === false) {
                    alert("중복된 아이디입니다.")
                    setAvailable(false);
                }
            });
    }, [user.userName]);


        return (
            <UserLayout>
                <MyBackButton pageName={'회원가입'}/>
                <Form onSubmit={onClickUserAdd}>
                    {/* 아이디 */}
                    <Row className='mt-5'>
                        <Col className='d-flex align-items-center justify-content-center' xs={3}>
                            <div>*아이디</div>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-center' xs={6}>
                            <Form.Control type="text" placeholder="아이디를 입력하세요." name={'userName'} value={user.userName}
                                          onChange={(event) => {
                                              onChangeId(event);
                                              onChange(event);

                                          }}/>

                        </Col>
                        <Col className='d-flex align-items-center justify-content-center' xs={3}>
                            <Button variant="warning" onClick={userNameCheck}>중복확인</Button>
                        </Col>
                    </Row>
                    <Row className={'mt-3 ms-2'}>{user.userName.length > 0 &&
                        <span className={`message ${isId ? 'success' : 'error'}`}>{idMessage}</span>}</Row>

                    {/* 비밀번호 */}
                    <Row className='mt-3'>
                        <Col className='d-flex align-items-center justify-content-center' xs={3}>
                            <div>*비밀번호</div>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-center' xs={6}>
                            <Form.Control type="password" placeholder="비밀번호를 입력하세요." className='w-100' name={'userPw'}
                                          value={user.userPw}
                                          onChange={event => {
                                              onChangePassword(event);
                                              onChange(event)
                                          }}/>
                        </Col>
                        <Col xs={3}>
                        </Col>
                    </Row>
                    <Row className={'mt-3 ms-2'}>{user.userPw.length > 0 &&
                        <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>}</Row>

                    {/* 비밀번호 확인 */}
                    <Row className='mt-3'>
                        <Col className='d-flex align-items-center justify-content-center' xs={3}>
                            <div className='text-center'>*비밀번호<br/>확인</div>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-center' xs={6}>
                            <Form.Control type="password" placeholder="비밀번호를 입력하세요." className='w-100'
                                          name={'userPwCheck'}
                                          value={user.userPwCheck}
                                          onChange={event => {
                                              onChangePasswordConfirm(event);
                                              onChange(event)
                                          }}/>
                        </Col>
                        <Col xs={3}>
                        </Col>
                    </Row>
                    <Row className={'mt-3 ms-2'}>{user.userPwCheck.length > 0 &&
                        <span
                            className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>}</Row>

                    {/* 이메일 */}
                    <Row className='mt-3'>
                        <Col className='d-flex align-items-center justify-content-center' xs={3}>
                            <div className='text-center'>*이메일</div>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-center' xs={6}>
                            <Form.Control type="text" placeholder="이메일을 입력하세요." className='w-100' name={'userEmail'}
                                          value={user.userEmail}
                                          onChange={event => {
                                              onChangeEmail(event);
                                              onChange(event)
                                          }}/>
                        </Col>
                        <Col xs={3}>
                        </Col>
                    </Row>
                    <Row className={'mt-3 ms-2'}>{user.userEmail.length > 0 &&
                        <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}</Row>

                    <Row className='mt-3'>
                        <Col className='d-flex align-items-center justify-content-center' xs={3}>
                            <div className='text-center'>*휴대폰번호</div>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-center' xs={6}>
                            <Form.Control type="text" placeholder="휴대폰번호를 입력하세요." className='w-100' name={'phoneNumber'}
                                          value={user.phoneNumber}
                                          onChange={event => {
                                              onChangePhoneNumber(event);
                                              onChange(event)
                                          }}/>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-center' xs={3}>
                            <Button variant="warning" onClick={onClickSendPhoneNumber} disabled={!isPhoneNumber}>인증번호발송</Button>
                        </Col>
                    </Row>
                    <Row className={'mt-3 ms-2'}>{user.phoneNumber.length > 0 &&
                        <span
                            className={`message ${isPhoneNumber ? 'success' : 'error'}`}>{phoneNumberMessage}</span>}</Row>

                    <Row className='mt-3'>
                        <Col className='d-flex align-items-center justify-content-center' xs={3}>
                            <div className='text-center'>*인증번호</div>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-center' xs={6}>
                            <Form.Control type="text" placeholder="인증번호를 입력하세요." name='checkSMS' value={user.checkSMS}
                                          onChange={onChange} className='w-100'/>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-center' xs={3}>
                            <Button variant="warning" onClick={checkSMS}>인증번호 확인</Button>
                        </Col>
                    </Row>

                    <Row className='mt-3'>
                        <Col className='d-flex align-items-center justify-content-center' xs={3}>
                            <div className='text-center'>*이름</div>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-center' xs={6}>
                            <Form.Control type="text" placeholder="이름을 입력하세요." className='w-100' name={'personalName'}
                                          value={user.personalName}
                                          onChange={event => {
                                              onChangeName(event);
                                              onChange(event)
                                          }}/>
                        </Col>
                        <Col xs={3}>
                        </Col>
                    </Row>
                    <Row className={'mt-3 ms-2'}>{user.personalName.length > 0 &&
                        <span className={`message ${isName ? 'success' : 'error'}`}>{nameMessage}</span>}</Row>


                    <Row className='mt-3'>
                        <Col className='d-flex align-items-center justify-content-center' xs={3}>
                            <div className='text-center'>*생년월일</div>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-center' xs={6}>
                            <Form.Control type="text" placeholder="생년월일을 입력하세요." className='w-100' name={'birthDay'}
                                          value={user.birthDay}
                                          onChange={event => {
                                              onChangeBirthDay(event);
                                              onChange(event)
                                          }}/>
                        </Col>
                        <Col xs={3}>
                        </Col>
                    </Row>
                    <Row className={'mt-3 ms-2'}>{user.birthDay.length > 0 &&
                        <span className={`message ${isBirthDay ? 'success' : 'error'}`}>{birthDayMessage}</span>}
                    </Row>

                    <Row>
                        <Col className='text-center mt-3'>
                            *은 필수입력 사항입니다.
                        </Col>
                    </Row>
                    <Row>
                        <Col className='text-center mt-3'>
                            <UserCheckModal btnName={'회원가입'} onClickUserAdd={onClickUserAdd}
                                            modalBody={'회원가입이 완료되었습니다.'}
                                            completeBtn={'/userCompleteSignUp'}
                                            condition={!(isName && isEmail && isPassword && isPasswordConfirm && isPhoneNumber && isBirthDay && isCheckSMS)}
                            />
                        </Col>
                    </Row>
                </Form>
            </UserLayout>
        )
}

export default UserSignUp