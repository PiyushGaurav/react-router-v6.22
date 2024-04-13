import { Outlet, Link, useLoaderData, useSubmit, useNavigation, Form, redirect, NavLink } from 'react-router-dom';
import { getContacts, createContact } from '../contacts';
import { useEffect } from 'react';

export async function loader({ request }) {
	const url = new URL(request.url);
	const q = url.searchParams.get('q');
	const contacts = await getContacts(q);
	return { contacts, q };
}

export async function action() {
	const contact = await createContact();
	return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
	const { contacts, q } = useLoaderData();
	const navigation = useNavigation();
	const submit = useSubmit();

	useEffect(() => {
		document.getElementById('q').value = q;
	}, [q]);

	return (
		<div className="root-container">
			<div className="sidebar">
				<div className="search-container">
					<Form id="search-form" role="search">
						<input
							className="search-input"
							placeholder="Search"
							type="search"
							id="q"
							name="q"
							defaultValue={q}
							onChange={event => {
								submit(event.currentTarget.form);
							}}
						></input>
					</Form>
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
