-- SQLBook: Code
-- Insert data into users table
INSERT INTO
	users (username, email, PASSWORD)
VALUES
	('john_doe', 'john_doe@example.com', 'password123'),
	(
		'jane_smith',
		'jane_smith@example.com',
		'password456'
	),
	(
		'alice_wonder',
		'alice_wonder@example.com',
		'password789'
	),
	(
		'bob_builder',
		'bob_builder@example.com',
		'password101'
	),
	(
		'charlie_brown',
		'charlie_brown@example.com',
		'password102'
	);

-- Insert data into articles table
INSERT INTO
	articles (title, description, date_published, user_id)
VALUES
	(
		'The Wonders of Nature',
		'An in-depth look at the beauty of the natural world.',
		'2024-01-01',
		1
	),
	(
		'Tech Innovations 2024',
		'A comprehensive review of the latest in technology.',
		'2024-02-01',
		2
	),
	(
		'Cooking Tips for Beginners',
		'Essential cooking tips for those just starting out.',
		'2024-03-01',
		3
	),
	(
		'DIY Home Improvement',
		'Guide to improving your home with DIY projects.',
		'2024-04-01',
		4
	),
	(
		'The History of Art',
		'Exploring the evolution of art through the ages.',
		'2024-05-01',
		5
	);

-- Insert data into tags table
INSERT INTO
	tags (tag_name)
VALUES
	('Nature'),
	('Technology'),
	('Cooking'),
	('DIY'),
	('Art'),
	('History'),
	('Tips'),
	('Guide');

-- Insert data into article_tags table
INSERT INTO
	article_tags (article_id, tag_id)
VALUES
	(1, 1), -- 'The Wonders of Nature' tagged with 'Nature'
	(2, 2), -- 'Tech Innovations 2024' tagged with 'Technology'
	(3, 3), -- 'Cooking Tips for Beginners' tagged with 'Cooking'
	(3, 7), -- 'Cooking Tips for Beginners' tagged with 'Tips'
	(4, 4), -- 'DIY Home Improvement' tagged with 'DIY'
	(4, 8), -- 'DIY Home Improvement' tagged with 'Guide'
	(5, 5), -- 'The History of Art' tagged with 'Art'
	(5, 6);

-- 'The History of Art' tagged with 'History'