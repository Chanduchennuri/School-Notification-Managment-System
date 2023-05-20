import React, { useEffect, useState } from 'react'
import Layout from './components/Layout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import instance from '../../util/instance';
import { getClassRoute, getTeacherRoute, linkTeacherClassRoute, unlinkTeacherClassRoute } from '../../API/Routes';


function TeacherComponent(props) {
    const [checked, setChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [clas, setClas] = useState('');
    //set initial status
    useEffect(() => {
        if (props.data.class.includes(props.clas)) {
            setChecked(true)
        }
        setEmail(props.data.email)
        setClas(props.clas)
    }, [props])

    const handleChange = async () => {
        //change status
        if (!checked) {
            const { data } = instance.post(linkTeacherClassRoute, {
                email,
                clas
            })
                .then((e) => {
                    setChecked(!checked);
                })
        }
        else {
            const { data } = instance.post(unlinkTeacherClassRoute, {
                email,
                clas
            })
                .then((e) => {
                    setChecked(!checked);
                })
        }

    };
    return (
        <div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={handleChange}
                    />
                    {props.data.email}
                </label>
            </div>
        </div>

    )
}


function EditClass() {
    const [clas, setClas] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get('id');
    const getCData = async () => {
        const { data } = await instance.get(`${getClassRoute}`);
        const result = data.find(({ _id }) => _id === id);
        return result;
    }

    const getTData = async () => {
        const { data } = await instance.get(`${getTeacherRoute}`);
        return data;
    }

    useEffect(() => {
        getCData().then((result) => {
            setClas(result.class);
        });
        getTData().then((result) => {
            setTeachers(result);
        });
    }, [id])


    return (
        <Layout>
            <div className="flex-1 w-full flex items-center justify-center rounded-lg">
                <form
                    method="POST"

                    className="bg-white shadow-xl text-lg max-w-full font-semibold flex flex-col p-10 rounded-md gap-5 items-center justify-center"
                >
                    <h1 className="text-2xl font-semibold">UPDATE CLASS</h1>
                    <div className="flex flex-col mx-4">
                        <p>{clas}</p>
                    </div>

                    <div className='grid text-white p-3 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-x-hidden overflow-y-auto'>
                        {
                            teachers.map((teacher) => (
                                <div className='flex bg-[#394867] rounded-md'>
                                    <TeacherComponent key={teacher._id} data={teacher} clas={clas} className='flex-1 text-white text-lg font-semibold flex flex-col p-4 rounded-md' />
                                </div>
                            ))
                        }
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default EditClass;