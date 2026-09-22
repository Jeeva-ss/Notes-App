import { useEffect, useState } from "react";

function App() {
	function getNotes() {
		const savedNotes = localStorage.getItem("notes");

		return savedNotes ? JSON.parse(savedNotes) : [];
	}

	const [notes, setNotes] = useState(getNotes);
	const [toggle, setToggle] = useState(false);
	const [editNote, setEditNote] = useState(null);

	const [formData, setFormData] = useState({
		title: "",
		priority: "Medium",
		description: "",
	});

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!formData.title || !formData.description) return;

		if (editNote) {
			const updatedNotes = notes.map((note) => {
				return note.id === editNote ? { ...note, ...formData } : note;
			});

			setNotes(updatedNotes);
		} else {
			const newNote = {
				id: Date.now(),
				...formData,
			};

			setNotes([newNote, ...notes]);
		}

		setFormData({
			title: "",
			priority: "Medium",
			description: "",
		});

		setEditNote(null);
		setToggle(false);
	};

	const handleToggle = () => {
		setToggle((prev) => !prev);
	};

	const handleEdit = (note) => {
		setEditNote(note.id);

		setFormData({
			title: note.title,
			priority: note.priority,
			description: note.description,
		});

		setToggle(true);
	};

	const deleteNote = (id) => {
		setNotes(notes.filter((note) => note.id !== id));
	};

	return (
		<div className="min-h-screen bg-[#15202b] px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl">
				{/* Header */}
				<header className="mb-10 flex flex-col gap-6 border-b border-[#38444d] pb-8 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#1d9bf0]">
							Personal Workspace
						</p>

						<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
							My Notes
						</h1>

						<p className="mt-2 max-w-lg text-sm leading-6 text-[#8899a6] sm:text-base">
							Capture your ideas, tasks and important thoughts in one simple
							workspace.
						</p>
					</div>

					{/* Counter */}
					<div className="rounded-2xl border border-[#38444d] bg-[#192734] px-5 py-4">
						<p className="text-xs font-medium uppercase tracking-wide text-[#8899a6]">
							Total Notes
						</p>

						<p className="mt-1 text-2xl font-bold text-white">{notes.length}</p>
					</div>
				</header>

				{/* Action Bar */}
				<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h2 className="text-lg font-semibold text-white">
							Your Collection
						</h2>

						<p className="mt-1 text-sm text-[#8899a6]">
							{notes.length === 0
								? "No notes created yet"
								: `${notes.length} ${
										notes.length === 1 ? "note" : "notes"
									} saved`}
						</p>
					</div>

					<button
						onClick={handleToggle}
						className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-bold transition ${
							toggle
								? "border border-[#536471] bg-transparent text-[#e7e9ea] hover:bg-[#1e2732]"
								: "bg-[#1d9bf0] text-white hover:bg-[#1a8cd8]"
						}`}
					>
						{toggle ? "Close" : "+ New Note"}
					</button>
				</div>

				{/* Form */}
				{toggle && (
					<form
						onSubmit={handleSubmit}
						className="mb-10 rounded-2xl border border-[#38444d] bg-[#192734] p-5 sm:p-7"
					>
						<div className="mb-6">
							<h2 className="text-xl font-semibold text-white">
								{editNote ? "Edit note" : "Create a new note"}
							</h2>
							<p className="mt-1 text-sm text-[#8899a6]">
								{editNote
									? "Update your note details."
									: "Add a title, priority and description."}
							</p>
						</div>

						<div className="grid gap-5 md:grid-cols-2">
							{/* Title */}
							<div>
								<label
									htmlFor="title"
									className="mb-2 block text-sm font-medium text-[#e7e9ea]"
								>
									Title
								</label>

								<input
									id="title"
									type="text"
									name="title"
									placeholder="e.g. React interview preparation"
									value={formData.title}
									onChange={handleChange}
									className="w-full rounded-xl border border-[#38444d] bg-[#15202b] px-4 py-3 text-sm text-white outline-none placeholder:text-[#657786] focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0]"
								/>
							</div>

							{/* Priority */}
							<div>
								<label
									htmlFor="priority"
									className="mb-2 block text-sm font-medium text-[#e7e9ea]"
								>
									Priority
								</label>

								<select
									id="priority"
									name="priority"
									value={formData.priority}
									onChange={handleChange}
									className="w-full cursor-pointer rounded-xl border border-[#38444d] bg-[#15202b] px-4 py-3 text-sm text-white outline-none focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0]"
								>
									<option value="Low">Low</option>
									<option value="Medium">Medium</option>
									<option value="High">High</option>
								</select>
							</div>

							{/* Description */}
							<div className="md:col-span-2">
								<label
									htmlFor="description"
									className="mb-2 block text-sm font-medium text-[#e7e9ea]"
								>
									Description
								</label>

								<textarea
									id="description"
									name="description"
									rows="5"
									placeholder="Write your thoughts..."
									value={formData.description}
									onChange={handleChange}
									className="w-full resize-none rounded-xl border border-[#38444d] bg-[#15202b] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-[#657786] focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0]"
								/>
							</div>
						</div>

						<div className="mt-6 flex justify-end border-t border-[#38444d] pt-5">
							<button
								type="submit"
								className="w-full cursor-pointer rounded-full bg-[#1d9bf0] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1a8cd8] sm:w-auto"
							>
								{editNote ? "Update Note" : "Create Note"}
							</button>
						</div>
					</form>
				)}

				{/* Empty State */}
				{notes.length === 0 ? (
					<div className="rounded-2xl border border-[#38444d] bg-[#192734] px-6 py-20 text-center">
						<div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#22303c] text-2xl">
							📝
						</div>

						<h3 className="text-lg font-semibold text-white">No notes yet</h3>

						<p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8899a6]">
							Start capturing your ideas, reminders and important information.
						</p>
					</div>
				) : (
					/* Notes Grid */
					<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{notes.map((note) => (
							<div
								key={note.id}
								className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-[#38444d] bg-[#192734] p-5 transition hover:border-[#536471] hover:bg-[#1d2b38]"
							>
								{/* Priority Gradient */}
								<div
									className={`absolute left-0 top-0 h-1 w-full ${
										note.priority === "High"
											? "bg-gradient-to-r from-red-500 via-orange-400 to-red-500"
											: note.priority === "Medium"
												? "bg-gradient-to-r from-yellow-500 via-amber-300 to-yellow-500"
												: "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500"
									}`}
								/>

								{/* Note Header */}
								<div className="flex items-start justify-between gap-4">
									<h3 className="line-clamp-2 text-lg font-semibold leading-6 text-white">
										{note.title}
									</h3>

									<span
										className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
											note.priority === "High"
												? "bg-red-500/10 text-red-400"
												: note.priority === "Medium"
													? "bg-yellow-500/10 text-yellow-400"
													: "bg-emerald-500/10 text-emerald-400"
										}`}
									>
										{note.priority}
									</span>
								</div>

								{/* Description */}
								<p className="mt-4 line-clamp-5 text-sm leading-6 text-[#8899a6]">
									{note.description}
								</p>

								{/* Card Footer */}
								<div className="mt-auto flex items-center justify-between border-t border-[#38444d] pt-4">
									<span className="text-xs font-medium text-[#657786]">
										NOTE #{String(note.id).slice(-4)}
									</span>

									<div className="flex items-center gap-2">
										<button
											onClick={() => handleEdit(note)}
											className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold text-[#8899a6] transition hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0]"
										>
											Edit
										</button>

										<button
											onClick={() => deleteNote(note.id)}
											className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold text-[#8899a6] transition hover:bg-red-500/10 hover:text-red-400"
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
