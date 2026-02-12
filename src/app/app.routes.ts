import { Routes } from '@angular/router';
import { List } from './components/list/list';
import { Form } from './pages/form/form';


export const routes: Routes = [
    {path: "", component: List},
    {path: "form", component: Form},
    {path: "form/:id", component: Form}

];
