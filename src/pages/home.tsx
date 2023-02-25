import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Card from '../components/Card';
import styled from './home.module.css';
const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
    const [datas, setDatas] = useState<any>()
    const [isError, setIsError] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        axios.get(API_URL + '/api/links')
            .then(res => {
                if (res.data?.success) {
                    setDatas(res.data.data)
                } else {

                }
            })
            .catch(err => {
                setIsError(err.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            placeItems: 'center',
            textAlign: 'left',
            height: '100vh',
            overflowY: 'auto'

        }}>
            <h1>List of Links</h1>
            {isError && <Card>{isError}</Card>}
            {isLoading && <Card>'Loading'</Card>}
            {datas && (
                <ol className={styled.ol}>
                    {datas.map((data: any, i: number) => {
                        return <li key={`link${i}`} className={styled.li}>
                            <NavLink to={data.doc_id + '/'} className={styled.a}>
                                {data.doc_id}
                            </NavLink>
                        </li>
                    })}
                </ol>
            )}


        </div>
    )
}

export default Home
