/* eslint-disable react/prop-types */
import { useState } from "react";
import "../stylesheets/postfeed.css";
import "../stylesheets/commentform.css";
import InitialCircle from './InitialCircle';

function NewComment({ postId, addComment }) {
	const [comment, setComment] = useState({ content: "" });
	const [contactId] = useState(1);
	const [author] = useState({ firstName: "", lastName: "" });



	const handleSubmit = (e) => {
		e.preventDefault();

		const newComment = {
			postId,
			content: comment.content,
			contactId,
		};

		const url = `https://boolean-uk-api-server.fly.dev/KajaPlaszko/post/${postId}/comment`;

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newComment),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to post comment");
				}
				return response.json();
			})
			.then((data) => {
				addComment(data);
				setComment({ content: "" });
			})
			.catch((error) => {
				console.error("Error posting comment:", error);
			});
	};
	function handleChange(e) {
		setComment({
			...comment,
			[e.target.name]: e.target.value,
		});
	}
	return (
		<div className="new-comment">
			<InitialCircle 
                firstName={author?.firstName} 
                lastName={author?.lastName} 
                color={author?.favouriteColour}
            />
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="content"
					placeholder="Add a comment..."
					value={comment.content}
					onChange={handleChange}
					required
				/>

				<button type="submit">Send</button>
			</form>
		</div>
	);
}

export default NewComment;
