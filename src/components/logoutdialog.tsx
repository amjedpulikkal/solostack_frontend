
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useCookies } from "react-cookie"
import { useAuthor } from "./switchUser-provider";
import { useNavigate } from "react-router-dom";
import { useSignOutQuery } from "@/reactQuery/student/signOut";
import { setLogout } from "@/redux/slices/authorSlice";
import { useDispatch,useSelector, } from "react-redux";

interface LoginDialogProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export function LoginDialog({ isOpen, setOpen }: LoginDialogProps): JSX.Element {
    const dispatch =useDispatch()

    const signOutApi = useSignOutQuery()
    const { setAuthor } = useAuthor()
    const navigate = useNavigate()
    const [, , removeCookie] = useCookies(['jwtToken']);
    const handleClose = () => {
        removeCookie('jwtToken', { path: '/' });
        setAuthor(null)
        signOutApi.mutateAsync().then(() => {
            
            dispatch(setLogout(null))
        })
    }

    return (
        <AlertDialog  open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle> Are you sure you want to logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to logout? This action will sign you out from the application.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClose}>Logout</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )




}
