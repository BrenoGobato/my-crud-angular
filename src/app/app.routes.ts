import { Routes } from '@angular/router';
import { List } from './components/list/list';
import { Form } from './components/form/form';
import { Edit } from './components/edit/edit';

export const routes: Routes = [
    {path: "", component: List},
    {path: "add", component: Form},
    {path: "edit/:id", component: Edit}
];
