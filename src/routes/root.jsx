import { Outlet, Link, useLoaderData, useNavigation, Form, redirect, NavLink } from 'react-router-dom';
import { getContacts, createContact } from '../contacts';

export async function loader() {
	const contacts = await getContacts();
	return { contacts };
}

export async function action() {
	const contact = await createContact();
	return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
	const { contacts } = useLoaderData();
	const navigation = useNavigation();

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
									<NavLink
										to={`contacts/${contact.id}`}
										className={({ isActive, isPending }) =>
											isActive ? 'navlink-title active' : isPending ? 'navlink-title pending' : 'navlink-title'
										}
									>
										{contact.first || contact.last ? (
											<>
												{contact.first} {contact.last}
											</>
										) : (
											<i>No Name</i>
										)}
										{contact.favorite && <span>★</span>}
									</NavLink>
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
			<div className={navigation.state === 'loading' ? 'detail loading' : 'detail'}>
				<Outlet />
			</div>
		</div>
	);
}
