-- categories table
CREATE TABLE forum_categories (
    category_title varchar(40) NOT NULL,
    category_description varchar(200) NOT NULL,
    category_icon varchar(40) NOT NULL,
    fk_user_id integer NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
    id serial PRIMARY KEY UNIQUE,
    uid uuid DEFAULT uuid_generate_v4 () UNIQUE,
    version int DEFAULT 1,
    is_active boolean DEFAULT TRUE,
    is_deleted boolean DEFAULT FALSE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- topics table
CREATE TABLE forum_topics (
    topic_title varchar(100) NOT NULL,
    topic_description varchar(400),
    topic_views integer DEFAULT 0,
    fk_category_id integer NOT NULL REFERENCES forum_categories (id) ON DELETE RESTRICT,
    fk_user_id integer NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
    id serial PRIMARY KEY UNIQUE,
    uid uuid DEFAULT uuid_generate_v4 () UNIQUE,
    version int DEFAULT 1,
    is_active boolean DEFAULT TRUE,
    is_deleted boolean DEFAULT FALSE,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW()
);

-- posts table
CREATE TABLE forum_posts (
    post_content varchar(10000) NOT NULL,
    reply_uid uuid,
    fk_topic_id integer NOT NULL REFERENCES forum_topics (id) ON DELETE RESTRICT,
    fk_user_id integer NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
    id serial PRIMARY KEY UNIQUE,
    uid uuid DEFAULT uuid_generate_v4 () UNIQUE,
    version int DEFAULT 1,
    is_active boolean DEFAULT TRUE,
    is_deleted boolean DEFAULT FALSE,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW()
);

-- triggers and audits
CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON forum_categories
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp ();

CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON forum_topics
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp ();

CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON forum_posts
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp ();

