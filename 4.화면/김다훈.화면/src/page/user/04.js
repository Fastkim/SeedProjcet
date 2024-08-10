import UserLayout from "../UserLayout"
import { Col, Row, Form, Button} from "react-bootstrap"
import MyBackButton from "../navigation/02"
import UserCheckModal from "./UserCheckModal"
import {useCallback, useState} from "react";
import {findUserName} from "../../api/userApi";
import {useNavigate} from "react-router-dom";


const UserFindId = () => {
    const [findUser, setFindUser] = useState({
        personalName:'',
        userEmail:''
    })

    const onChange = e => {
        findUser[e.target.name] = e.target.value
        setFindUser({...findUser})
    }

    const navigate = useNavigate()

    const onClickUserFindId = useCallback(() => {
        findUserName(findUser).then(response => {
            if(response !== "error"){
                setFindUser(response);
                alert(`회원님의 아이디는 ${response} 입니다.`)
                navigate('/userLogin');
            } else {
                alert("이름과 이메일이 일치하지 않습니다.")
                window.location.reload();
            }

        })
            .catch(error => {
                console.log(error);


            });
    }, [findUser])

    return (
        <UserLayout>
            <MyBackButton pageName={'아이디 찾기'}/>
            <Row className="mt-5">
                <Col>
                    <Row className="mt-5 ms-3 fs-5 fw-bold">
                        아이디 찾기
                    </Row>
                    <Row className="d-flex justify-content-center mt-4">
                        <Form.Control type="text" name="personalName" placeholder="이름" className="w-75" onChange={onChange}/>
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <Form.Control type="text" name="userEmail" placeholder="이메일" className="w-75 mt-3" onChange={onChange}/>
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <Button onClick={onClickUserFindId} className={'w-75 mt-3'}>
                            아이디 찾기
                        </Button>
                    </Row>
                </Col>
            </Row>
        </UserLayout>
    )

}

export default UserFindId