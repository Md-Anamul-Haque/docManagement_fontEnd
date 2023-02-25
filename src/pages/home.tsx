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
        <div className={styled.card}>
            <div className="card-header">
                <h1>List of Links</h1>
            </div>
            {isError && <Card>{isError}</Card>}
            {isLoading && <Card><h2>Loading</h2></Card>}
            {datas && (
                <div className="card-body">
                    <ol className={styled.ol}>
                        {datas.map((data: any, i: number) => {
                            return <li key={`link${i}`} className={styled.li}>
                                <NavLink to={data.doc_id + '/'} className={styled.a}>
                                    {data.doc_id.replace(/_/g, ' ')}
                                </NavLink>
                            </li>
                        })}
                    </ol>
                </div>
            )}
        </div>
    )
}

export default Home
