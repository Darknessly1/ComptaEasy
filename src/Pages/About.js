import {
    Typography
} from "@material-tailwind/react";

import Founders from "../Elements/Founders";


function About() { 
    return(
        <>
        <div className="div-class"></div>
            <div className='m-4'>
                <figure className="relative h-96 w-full">
                    <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                    <div >
                        <Typography variant="h4" color="blue-gray">
                        Introduction to the site
                        </Typography>
                        <Typography color="gray" className="mt-2 font-bold  ">
                            Welcome to ComptaEasy - Where Accounting Meets Simplicity! 
                            <br />
                            <br />
                            Embark on a journey of financial clarity with ComptaEasy, your go-to destination for hassle-free and efficient accounting solutions. We understand that navigating the complexities of finances can be a daunting task, but with ComptaEasy, we've simplified the process to make managing your accounts easy, intuitive, and, most importantly, stress-free.
                            At ComptaEasy, we believe that everyone should have access to straightforward and user-friendly accounting tools. Whether you're a small business owner, a freelancer, or an individual looking to manage personal finances, our platform is designed to streamline your accounting processes, allowing you to focus on what matters most - growing your business or achieving your financial goals.
                            Why choose ComptaEasy? 
                            <br />
                            <br />
                            Simplicity at Its Core: We believe in making accounting accessible to everyone. Our user-friendly interface and intuitive features ensure that you don't need to be a financial expert to manage your accounts effectively.
                            Tailored Solutions: No two financial journeys are the same. That's why ComptaEasy offers customizable solutions to meet your unique accounting needs. From invoicing to expense tracking, we've got you covered.
                            Security You Can Trust: Your financial data is precious, and we take its security seriously. ComptaEasy employs cutting-edge encryption and data protection measures to keep your information safe and confidential.
                            24/7 Support: Need assistance? Our dedicated support team is available around the clock to answer your queries and provide guidance. Your success is our priority.
                            Join the ComptaEasy community and experience a new era of stress-free accounting. Discover how easy managing your finances can be - sign up today and take control of your financial future!
                        </Typography>
                    </div>
                    <Typography variant="h6" color="blue-gray">
                        ComptaEasy
                    </Typography>
                    </figcaption>
                </figure>
            </div>
            <Founders />
        </>
    )
}

export default About; 