import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText(new RegExp(dueDate, "i"));

  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
 });


 test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText(new RegExp(dueDate, "i"));

  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
 });


 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  const dup_task = "Task 1"
  const dueDate = "06/30/2022";

  fireEvent.change(inputTask, {target: {value: dup_task}})
  fireEvent.change(inputDate, {target: {value: dueDate}})
  fireEvent.click(element)

  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText(new RegExp(dueDate, "i"));

  fireEvent.change(inputTask, {target: {value: dup_task}})
  fireEvent.change(inputDate, {target: {value: dueDate}})
  fireEvent.click(element)

  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();

 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("Due Date");
  const element = screen.getByRole('button', {name: /Add/i});

  const dueDate = "06/30/2022";

  fireEvent.change(inputDate, {target: {value: dueDate}})
  fireEvent.click(element)

  expect(checkDate).toBeInTheDocument();

 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const element = screen.getByRole('button', {name: /Add/i});

  const taskName = "Walk dog";

  fireEvent.change(inputTask, {target: {value: taskName}})
  fireEvent.click(element)

  expect(taskName).toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  

  const dup_task = "Task 1";
  const dueDate = "06/30/2022";

  fireEvent.change(inputTask, {target: {value: dup_task}})
  fireEvent.change(inputDate, {target: {value: dueDate}})
  fireEvent.click(element)

  const outputCheckbox = screen.getByRole('checkbox');
  const check = screen.getByText(/Task 1/i);
  const checkDate = screen.getByText(new RegExp(dueDate, "i"));

  fireEvent.click(outputCheckbox)

  expect(check).not.toBeInTheDocument();
  expect(checkDate).not.toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
 });
