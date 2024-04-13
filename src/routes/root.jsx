import { Outlet, Link, useLoaderData, Form } from 'react-router-dom';
import { getContacts, createContact } from '../contacts';

export async function loader() {
	const contacts = await getContacts();
	return { contacts };
}

export async function action() {
	const contact = await createContact();
	return { contact };
}

export default function Root() {
	const { contacts } = useLoaderData();

	return (
		<div className="root-container">
			<div className="sidebar">
				<div className="search-container">
					<input className="search-input" placeholder="Search" type="search"></input>
					<Form method="post">
						<button className="new-button" type="submit">
							New
						</button>
					</Form>
				</div>
				<nav className="nav-container">
					{contacts.length ? (
						<ul>
							{contacts.map(contact => (
								<li key={contact.id}>
									<Link to={`contacts/${contact.id}`} className="navlink-title">
										{contact.first || contact.last ? (
											<>
												{contact.first} {contact.last}
											</>
										) : (
											<i>No Name</i>
										)}
										{contact.favorite && <span>★</span>}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p>
							<i>No contacts</i>
						</p>
					)}
				</nav>
				<span className="sidebar-title">React Router Contacts</span>
			</div>
			<div className="detail">
				<Outlet />
			</div>
		</div>
	);
}
