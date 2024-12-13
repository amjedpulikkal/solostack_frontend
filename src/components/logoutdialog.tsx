import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useCookies } from "react-cookie";

import { useSignOutQuery } from "@/reactQuery/student/signOut";
import { setLogout } from "@/redux/slices/authorSlice";
import { useDispatch } from "react-redux";

interface LoginDialogProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export function LoginDialog({
  isOpen,
  setOpen,
}: LoginDialogProps): JSX.Element {
  const dispatch = useDispatch();

  const signOutApi = useSignOutQuery();

  const [, , removeCookie] = useCookies(["jwtToken"]);
  const handleClose = () => {
    removeCookie("jwtToken", { path: "/" });
    signOutApi.mutateAsync().then(() => {
      dispatch(setLogout());
    });
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout? This action will sign you out from
            the application.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleClose}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
