import lunr from 'lunr';
import dotenv from 'dotenv';
import {promises as fs} from 'fs';

dotenv.config();

const response = await fetch(`${process.env.UMBRACO_HOST}/umbraco/delivery/api/v2/content?filter=contentType:post&fields=properties[excerpt,tags]`);
if (!response.ok) {
    throw new Error(`The Delivery API response was not OK: ${response.status}`);
}

const data = await response.json();

let id = 1;
const posts = data.items.map((item) => ({
    id: id++,
    path: item.route.path,
    title: item.name,
    excerpt: item.properties.excerpt,
    tags: item.properties.tags
}));

const index = lunr(function () {
    this.ref('id');
    this.field('title');
    this.field('excerpt');
    this.field('tags');

    posts.forEach(post => {
        this.add(post);
    }, this);
});

const raw = {};
posts.forEach(post => raw[post.id] = {
	path: post.path,
	title: post.title,
	excerpt: post.excerpt,
	tags: post.tags
});

const searchData = {raw, index};

await fs.writeFile('./public/search-data.json', JSON.stringify(searchData));

console.log(`Search index was built successfully - the index contains ${posts.length} posts`);
