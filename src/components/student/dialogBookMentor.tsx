import React, { useState, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '../ui/button';
import { useSendRequest } from '@/reactQuery/mentor/mentorQuery';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function DialogBookMentor({ openAndData, setOpenAndData }) {

  const student = useSelector((state:RootState)=>state.author?.authorData)
  const { isLoading, mutate } = useSendRequest();
  const [requestData, setRequestData] = useState('');

  const textAreaRef = useRef(null);
  console.log(openAndData,student)
  const handleRequest = () => {
  
    const requestDataValue = textAreaRef.current.value;


    if (requestDataValue.trim() !== '') {
  
      mutate({data:requestDataValue,mentorRVId:openAndData.data?._id});

      setRequestData('');
      setOpenAndData({ isOpen: false, data: '' });
    }
  };

  return (
    <AlertDialog open={openAndData.isOpen} onOpenChange={(isOpen) => setOpenAndData({ isOpen, data: '' })}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Book new session</AlertDialogTitle>
          {/* Display user avatar or profile image */}
          <div className="w-full flex justify-center gap-20 items-center h-28">
            <img src={`https://d3sd9xkxgxzd5z.cloudfront.net/${openAndData.data?.mentorId?.personal_info?.photo}`}       className="w-24 h-24 rounded-full div1 bg-slate-950"/>
            <img src={student?.personal_info?.photo}  className="w-24 h-24 rounded-full div1 bg-slate-950"/>
          </div>
          <AlertDialogDescription>
            <Textarea
              ref={textAreaRef}
              required
              className="h-40"
              placeholder="Type what you expect from this session"
              value={requestData}
              onChange={(e) => setRequestData(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          
          <AlertDialogCancel onClick={() => setOpenAndData({ isOpen: false, data: '' })}>
            Cancel
          </AlertDialogCancel>
    
          <Button onClick={handleRequest} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Request'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
