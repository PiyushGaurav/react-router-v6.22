import { Form, useLoaderData } from 'react-router-dom';
import { getContact } from '../contacts';

export async function loader({ params }) {
	const contact = await getContact(params.contactId);
	return { contact };
}

export default function Contact() {
	const { contact } = useLoaderData();

	return (
		<div className="contact-container">
			<div className="avatar">
				<img key={contact.avatar} src={contact.avatar || null} />
			</div>

			<div className="contact-details">
				<h1>
					{contact.first || contact.last ? (
						<>
							{contact.first} {contact.last}
						</>
					) : (
						<i>No Name</i>
					)}
				</h1>

				{contact.twitter && (
					<p>
						<a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
							{contact.twitter}
						</a>
					</p>
				)}

				{contact.notes && <p>{contact.notes}</p>}

				<div className="btn-container">
					<Form action="edit">
						<button className="edit-btn" type="submit">
							Edit
						</button>
					</Form>
					<Form
						method="post"
						action="destroy"
						onSubmit={event => {
							if (!confirm('Please confirm you want to delete this record.')) {
								event.preventDefault();
							}
						}}
					>
						<button className="delete-btn" type="submit">
							Delete
						</button>
					</Form>
				</div>
			</div>
		</div>
	);
}

function Favorite({ contact }) {
	// yes, this is a `let` for later
	let favorite = contact.favorite;
	return (
		<Form method="post">
			<button
				name="favorite"
				value={favorite ? 'false' : 'true'}
				aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
			>
				{favorite ? '★' : '☆'}
			</button>
		</Form>
	);
}
