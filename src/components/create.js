import { useState } from "react";
import { useHistory } from "react-router-dom";//can be used for redirecting

const Create = () => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handelSubmit = (e) => {
        e.preventDefault(); // prevents the refresh done by default by the submit button
        const blog = { title, author, body };
        setIsPending(true);
        // console.log(blog);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "content-Type": "application/json" }, // we can say the content type that is being sent with the request
            body: JSON.stringify(blog)
        })
            .then(() => {
                setIsPending(false);
                // history.go(-1) <- this because of -1 redirects the user to the previous page the user was in
                history.push('/');
            })
    }

    return (
        <div className="create">
            <h2>Add new blog</h2>
            <form onSubmit={handelSubmit}>
                <label htmlFor="blogtitle">Blog Title:</label>
                <input type="text"
                    required
                    name="blogtitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="blogauthor">Blog author:</label>
                <input type="text"
                    required
                    name="blogauthor"
                    value={author}
                    onChange={(e) => { setAuthor(e.target.value) }}
                />
                <label htmlFor="#">Blog Body:</label>
                <textarea required
                    value={body}
                    onChange={(e) => { setBody(e.target.value) }}
                />
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog....</button>}
            </form>
        </div>
    );
}
export default Create;