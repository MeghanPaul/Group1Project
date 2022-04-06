 INSERT INTO user (username, email, password, first_name, last_name)
 VALUES
    ('newUser', 'newu@email.com', '123456', 'Tom', 'Shane'),
    ('tigerlover', 'tigerlove@email.com', 'abcdef', 'Carol', 'Baskin'),
    ('tigerlover1', 'exotictigers@email.com', 'tiger1', 'Joe', 'Exotic'),
    ('lilcoder', 'coder1@email.com','bcrypt', 'Jane', 'Doe'),
    ('codeman', 'codeheaven@email.com', 'nodejs', 'John', 'Smith'),
    ('secretagent', 'bondwannabe@email.com', 'agent007', 'Johnny', 'English');

INSERT INTO product (title, description, price, img_link, user_id)
VALUES
    ('gold chain', '18 karat gold chain', 52, 'www.goldchain.com', 1),
    ('sapphire ring', 'A small sapphire ring', 80, 'www.ring.com', 1),
    ('Tiger Plush', 'A cute little plush tiger toy', 12, 'www.tigerplush.com', 2),
    ('Tiger Pelt', 'A luxurious Siberian Tiger pelt', 2400, 'www.notillegal.com', 3),
    ('mouse pad', 'A hand woven mousepad, only for decoration', 21, 'www.useless.com', 4),
    ('coding stickers', 'Handmade stickers for anyone into coding', NULL, 'www.handmade.com', 4),
    ('Laptop stand', 'A custom laptop stand to support your laptop', 34, 'www.stand.com', 5),
    ('laser pen', 'A ballpoint pen that shoots lasers!', 650, 'www.agent.com', 6),
    ('exploding watch', 'A watch full of firecrackers, good for distracting', 45, 'www.watch.com', 6);

INSERT INTO post (title, post_url, user_id, product_id)
VALUES
    ('Jewelry', 'www.goldchain.com', 1, 1),
    ('More Jewelry', 'www.ring.com', 1, 2),
    ('Tiger Toy', 'www.tigerplush.com', 2, 3),
    ('Luxury Decor', 'www.notillegal.com', 3, 4),
    ('Desk Accessories', 'www.useless.com', 4, 5),
    ('More Desk Accessories', 'www.handmade.com', 4, 6),
    ('Desk Essentials', 'www.stand.com', 5, 7),
    ('Spy Goods', 'www.agent.com', 6, 8),
    ('Every Spy needs this!', 'www.watch.com', 6, 9);

INSERT INTO comment (text, user_id, product_id)
VALUES
    ('This chain looks fake', 3, 1),
    ('Is this gold plated brass?', 5, 1),
    ('I love the look of this ring!', 2, 2),
    ('I have always wanted one of these', 6, 2),
    ('So cute', 1, 3),
    ('I want this for my zoo', 3, 3),
    ('How could you sell this???', 2, 4),
    ('Is this from a real tiger?', 1, 4),
    ('Looks cool but what would I do with it?', 5, 5),
    ('Do you have any tiger stickers?', 2, 6),
    ('I need this!', 4, 7),
    ('Wow this is so cool but it is expensive', 1, 8),
    ('It is totally worth it', 6, 8),
    ('This would startle my kitties!', 2, 9);

INSERT INTO vote (user_id, product_id)
VALUES
    (6, 2),
    (2, 4),
    (1, 6),
    (1, 4),
    (1, 3),
    (3, 1),
    (3, 2),
    (3, 9),
    (4, 8),
    (4, 9),
    (5, 7),
    (5, 4),
    (6, 4);