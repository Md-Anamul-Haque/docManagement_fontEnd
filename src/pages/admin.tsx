import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillFileAdd } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Card from "../components/Card";
import { CUD, CUDManager } from "../CUD";
import styled from './admin.module.css';
const API_URL = import.meta.env.VITE_API_URL;


const ListOfDocLink = ({ data, datas }: { data: any, datas: any }) => {
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [inputFildValue, setInputFildValue] = useState<string>(data.doc_id || '')
    const navigator = useNavigate()
    const editPageName = () => {
        Swal.fire({
            title: 'change a unik link name',
            input: 'text',
            inputValue: inputFildValue,
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Save Change',
            showConfirmButton: true,
            showLoaderOnConfirm: true,
            inputAutoFocus: true,
            customClass: {
                validationMessage: 'required this filed'
            },
            preConfirm: async (url: any) => {

                try {
                    if (!url) {
                        Swal.showValidationMessage(
                            '<i class="fa fa-info-circle"></i> this filed name is required'
                        )
                    }
                    let datasToDoc_ids: string[] = [];
                    datas.forEach((d: any) => {
                        datasToDoc_ids.push(d.doc_id)
                    });
                    if (datasToDoc_ids.indexOf(url) != -1) {
                        Swal.fire({
                            title: `alredy have this name / url'${url}'?`,
                            showCancelButton: true,
                            confirmButtonText: 'Try other name',

                            preConfirm: async () => {
                                editPageName()
                            }
                        })
                    } else if (url.indexOf('/') != -1) {
                        Swal.fire({
                            title: `'/' is not a valid url you past a valid string url`,
                            showCancelButton: true,
                            confirmButtonText: 'Try other name',

                            preConfirm: async () => {
                                editPageName()
                            }
                        })
                    } else if (url) {
                        CUD.put({
                            url: API_URL + '/api/doc/' + data.doc_id,
                            data: { doc_id: url }
                        }, (res, err) => {
                            if (res.data.success) {
                                Swal.fire({
                                    title: `Now write something on this page '${res.data?.data?.doc_id}'?`,
                                }).then(() => {
                                    navigator(res.data?.data?.doc_id.replace(/\ /g, '_') + '/')
                                })
                            }
                        })
                    } else {
                        Swal.fire({
                            title: `not a valie url name of '${url}'?`,
                            showCancelButton: true,
                            confirmButtonText: 'Try other name',

                            preConfirm: async () => {
                                editPageName()
                            }
                        })
                    }
                } catch (error) {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    );
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        })

    };

    return (<li className={styled.li}>

        <div >
            <NavLink className={styled.navLink} to={data.doc_id.replace(/\ /g, '_') + '/'}>
                {data.doc_id.replace(/_/g, ' ')}
            </NavLink>
        </div>
        <button onClick={editPageName}><FaRegEdit />edit</button>
    </li>
    )
}
const Admin = () => {
    const [datas, setDatas] = useState<any>()
    const [isError, setIsError] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const navigator = useNavigate()
    // check auth
    useEffect(() => {
        axios.get(API_URL + '/api/sign-in')
            .then((res: any) => {
                if (!res.data?.success && res.data?.isLogdin != 'yes') {
                    navigator('/sign-in')
                }
            })
            .catch(err => {
                setIsError(err.message)
            })

        axios.interceptors.response.use(function (response) {
            if (response.data?.success == false && response.data?.isLogdin == 'no') {
                navigator('/sign-in')
            }
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
    }, [])
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

    const addNew_page = () => {
        Swal.fire({
            title: 'Enter a new link',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Create',
            showLoaderOnConfirm: true,
            preConfirm: async (url: any) => {
                try {
                    if (!url) {
                        Swal.showValidationMessage(
                            '<i class="fa fa-info-circle"></i> this filed name is required'
                        )
                    } else if (url) {
                        CUD.post({
                            url: API_URL + '/api/doc/' + url,
                            data: {}
                        }, (res, err) => {
                            if (res.data.success) {
                                Swal.fire({
                                    title: `Now write something on this page '${res.data?.data?.doc_id}'?`,
                                }).then(() => {
                                    navigator(res.data?.data?.doc_id.replace(/\ /g, '_') + '/')
                                })
                            }
                        })
                    }
                } catch (error) {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    );
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
    };

    return (
        <main className={styled.main}>
            {/* <swal-image src="..." width="..." height="..." alt="..." /> */}
            {isError && <Card>{isError}</Card>}
            {isLoading && <Card>'Loading'</Card>}
            <div className="sign-out-nav">
                <NavLink to={"sign-out/"}>
                    sign-out
                </NavLink>
            </div>
            {datas && (
                <ol className={styled.ol}>
                    {datas.map((data: any, i: number) => {
                        return <ListOfDocLink key={i} {...{ data, datas }} />
                    })}
                    <button className={styled.addBtn} onClick={addNew_page}><AiFillFileAdd /> new page</button>
                </ol>
            )}
            <CUDManager />
        </main>
    )
}

export default Admin
