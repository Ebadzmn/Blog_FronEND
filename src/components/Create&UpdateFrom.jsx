import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import{toast} from "react-hot-toast";


const CreateUpdateFrom = () => {
     let { postId } = useParams();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        title: "",
        content: "",
        img: ""
    });

    let [Data, setData] = useState(false);

    useEffect(() => {
        (async () => {
            let res = await axios.get("https://blogapiew.onrender.com/api/v1/blogsGetID/"+postId);
            setFormData(res.data['data']);
            setData(true);

        })();
    }, []);




    const inputonChange = (property, value) => {
        setFormData({ ...formData, [property]: value });
    };

    const onSubmit = async () => {
        let URL = "https://blogapiew.onrender.com/api/v1/blogPost";

        if(postId){
            URL = `https://blogapiew.onrender.com/api/v1/blogsUpdate/${postId}`;
        }
        const res = await axios.post(
            URL,
            formData
        );
        if (res.status === 200) {
            toast.success("Save Changes");
            navigate("/");
        } else {
            toast.error("Failed Create");
        }
    };

    return (
        <div className="container mt-4">
            <input
                value={formData.title}
                onChange={(e) => inputonChange("title", e.target.value)}
                className="form-control mb-2"
                type="text"
                placeholder="Title"
            />
            <textarea
                value={formData.content}
                onChange={(e) => inputonChange("content", e.target.value)}
                className="form-control mb-2"
                rows="6" // Adjust the number of rows to control the height
                placeholder="Content"
            />
            <input
                value={formData.img}
                onChange={(e) => inputonChange("img", e.target.value)}
                className="form-control mb-2"
                type="text"
                placeholder="Image URL"
            />

            <button onClick={onSubmit} className="btn btn-primary">
                Submit
            </button>


        </div>
    );
};

export default CreateUpdateFrom;
















































// import {useState} from "react";
// import axios from "axios";
// import {useNavigate} from "react-router-dom";
//
//
// const CreateUpdateFrom = () => {
//     // let {id} = useParams();
//     const navigate = useNavigate();
//
//     const [formData,setFormData] = useState({
//         title:"",
//         content:"",
//         img:""
//     })
//
//     const inputonChange = (property,value) => {
//         setFormData({...formData,[property]:value})
//     }
//
//     const onSubmit = async () => {
//         const res = await axios.post ("http://localhost:8000/api/v1/blogPost",formData);
//         if (res.status === 200) {
//             alert("create success");
//             navigate("/");
//         } else {
//             console.log("create failed");
//         }
//     }
//
//     return (
//         <div>
//             <input value={formData.title} onChange={(e) => inputonChange("title",e.target.value)} type="text" placeholder="title"/>
//             <input value={formData.content} onChange={(e) => inputonChange("content",e.target.value)} type="text" placeholder="content"/>
//             <input value={formData.img} onChange={(e) => inputonChange("img",e.target.value)} type="text" placeholder="img"/>
//
//             <button onClick={onSubmit}>Submit</button>
//
//         </div>
//     );
// };
//
// export default CreateUpdateFrom;