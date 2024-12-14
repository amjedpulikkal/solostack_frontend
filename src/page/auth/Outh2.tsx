import { useEffect } from "react";
import {  useParams } from "react-router-dom"
import { useCookies } from "react-cookie"
import { isOauth } from "@/reactQuery/student/isOauth";
import { setAuthor, setAuthorData } from "@/redux/slices/authorSlice";
import { useDispatch, useSelector, } from "react-redux";
import { RootState } from "../../redux/store"
import { StudentData } from "@/type";
import { useNavigate } from "react-router-dom";


export default function Outh2() {
   
    const crateIsOauthUpMutation = isOauth()
    const navigate = useNavigate();
    const { provider, token } = useParams()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookies, setCookie] = useCookies(['jwtToken']);
    const dispatch = useDispatch()
    
    const data = useSelector((state: RootState) => state.author?.authorData) as unknown as StudentData
    useEffect(() => {
        const fetchData = async () => {
            // if (token) {
                setCookie('jwtToken', token, { path: '/', });
                console.log(provider, token);
                try {
                    const data = await crateIsOauthUpMutation.mutateAsync(token);
                    console.log(data, "eeeeeeeeeeeeeeeee333333333");
                    dispatch(setAuthorData(data))
                    dispatch(setAuthor("student"))
                    console.log(data, "eeeeeeeeeeeeee«eee333333333");
                    navigate("/student")
                    console.log("-----------------------------", token)
                } catch (error) {
                    // Handle error appropriately
                    console.error("Error fetching data:", error);
                }
            // }
        };
        fetchData();

    }, [ provider, token]);
    return (
        <>
            hello world!  hi {data?.email}
        </>
    )




}