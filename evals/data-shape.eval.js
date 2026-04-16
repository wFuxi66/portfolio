import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const REQUIRED_PROJECT_FIELDS = ['id', 'title', 'category', 'description', 'technologies'];

export default async function run() {
    const projectsUrl = pathToFileURL(resolve('src/data/projects.js')).href;
    const mod = await import(projectsUrl);
    const { projects } = mod;

    if (!Array.isArray(projects) || projects.length === 0) {
        throw new Error('expected projects to be a non-empty array');
    }

    const ids = new Set();
    for (const project of projects) {
        for (const field of REQUIRED_PROJECT_FIELDS) {
            if (project[field] === undefined || project[field] === null || project[field] === '') {
                throw new Error(`project "${project.title ?? project.id ?? '<unknown>'}" is missing required field "${field}"`);
            }
        }
        if (!Array.isArray(project.technologies) || project.technologies.length === 0) {
            throw new Error(`project "${project.title}" must list at least one technology`);
        }
        if (ids.has(project.id)) {
            throw new Error(`duplicate project id: ${project.id}`);
        }
        ids.add(project.id);
    }
}
