import logoHome from "../assets/images/logo512.png"
import logoApp from "../assets/images/logo192.png"
import { Input, Button, Form } from "antd";

const Home = () => {
    return (
        <>
            <img className=" image-home" src={logoApp} />
            <p></p>
            Trang Home
            <div className="home-contain">

                <p>Nguyên tắc cơ bản về ReactJS</p>

                <p> ReactJS là gì?</p>
                <p>ReactJS là một opensource được phát triển bởi Facebook, ra mắt vào năm 2013, bản thân nó là một thư viện Javascript được dùng để để xây dựng các tương tác với các thành phần trên website. Một trong những điểm nổi bật nhất của ReactJS đó là việc render dữ liệu không chỉ thực hiện được trên tầng Server mà còn ở dưới Client nữa.
                    JSX trong ReactJS</p>
                <p>JSX là một cú pháp mở trọng cho JavaScript, JSX có thể trông giống Ngôn ngữ Khuôn mẫu (Template language), nhưng JSX đi kèm với toàn bộ tính năng của JavaScript.
                    ReactJS Component</p>
                <p> Dưới khái niệm component, chúng ta sẽ chia trang web trên thành nhiều các thành phần nhỏ lẽ, mỗi thành phần đó được gọi chung là 1 component, chúng ta có 1 component cha chứa tất cả đám con của nó, cái này lồng vào cái kia để tạo thành 1 website hoàn chỉnh.
                    Class Component</p>
                <p> Các Class components chúng phức tạp hơn functional components ở chỗ nó còn có: phương thức khởi tạo, life-cycle, hàm render() và quản lý state (data). Ví dụ dưới đây là class component:
                </p>

            </div>

        </>
    )
}

export default Home;