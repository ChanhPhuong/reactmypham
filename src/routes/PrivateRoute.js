import { Routes, Route } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { Alert } from "react-bootstrap";

const PrivateRoute = (props) => {
    const { user } = useContext(UserContext);

    if (user && !user.auth) {
        return <>
            <Alert variant="danger" className="mt-3">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    Mày đăng nhập xong rồi quay lại đây cho t ko thì t đánh mày chết
                    <p></p>
                    Không đăng nhập mà muốn vào à
                    <p></p>
                    Ai cho vậy ha đm mày
                </p>
            </Alert>
        </>

    }

    return (
        <>
            {/* <Routes>
                <Route path={props.path} element={props.children} />
            </Routes> */}
            {props.children}


        </>
    )

}

export default PrivateRoute;