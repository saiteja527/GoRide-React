import React from 'react'
import './Footer.css'
import logo from '../../assets/GoRideLogo.png'
import user_icon from '../../assets/user_icon.svg'



const Footer = () => {
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "ac82d2ba-9eef-4715-b2fd-7113e311c8b3");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
        setTimeout(() => {
            setResult("");
        }, 1000);
    };
    return (
        <div className='footer'>
            <div className="footer-top">
                <div className="footer-top-left">
                    <img src={logo} alt="" />
                    <p>GoRide. for Business is a platform for managing global rides and meals, and local deliveries, for companies of any size.</p>
                </div>
                <div className="footer-top-right">
                    <img src={user_icon} alt="" />
                    <div className="user-input">
                        <form onSubmit={onSubmit}>
                            <input type="email" name="email" required placeholder='Enter Your Email' />
                            <button type="submit">Join With Us</button>
                        </form>
                        <span>{result}</span>
                    </div>
                </div>
            </div>
            <hr />
            <div className="footer-bottom">
                <div className="footer-bottom-left">
                    <p>© 2024 GoRide. Technologies Inc.</p>
                </div>
                <div className="footer-bottom-right">
                    <p>Privacy</p>
                    <p>Accessibility</p>
                    <p>Terms</p>
                </div>
            </div>

        </div>
    )
}

export default Footer
