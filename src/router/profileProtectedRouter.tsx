import { useAuthor } from '@/components/switchUser-provider';
import { Page404 } from '@/page/404';
import NaveBar from '@/page/mentor/navBar';
import { RootState } from '@/redux/store';
import { Iauthor } from '@/type';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';


export function ProfileProtectedRouter(): JSX.Element {
 
    const author = useSelector((state: RootState) => state.author?.author) as unknown as Iauthor

    if (author === "mentor") {

        return (
            <>
                <NaveBar />
                <Outlet />
            </>)

    } else {

        <Outlet />
    }
};

