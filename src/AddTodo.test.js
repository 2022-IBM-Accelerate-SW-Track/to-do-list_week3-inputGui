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

// Beginning each test
 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i}); // i means case insensitive
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, {target: {value: "Project 1"}});
  fireEvent.change(inputDate, {target: {value: "06/27/2022"}});
  fireEvent.click(element);
  fireEvent.change(inputTask, {target: {value: "Project 2"}});
  fireEvent.change(inputDate, {target: {value: "06/27/2022"}});
  fireEvent.click(element);
  const check = screen.getAllByText(/Project 1/i)
  expect(check.length).toBe(1); 
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const element = screen.getByRole('button', {name: /Add/i});
 
  fireEvent.change(inputDate, {target: {value: "06/27/2023"}});
  fireEvent.click(element);

  const check = screen.getByText(/You have no todo's left/i)
  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i}); // i means case insensitive
  const element = screen.getByRole('button', {name: /Add/i});
 
  fireEvent.change(inputTask, {target: {value: "Project 3"}});
  fireEvent.click(element);

  const check = screen.getByText(/You have no todo's left/i)
  expect(check).toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i}); // i means case insensitive
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const element = screen.getByRole('button', {name: /Add/i});
 
  fireEvent.change(inputTask, {target: {value: "Project 3"}});
  fireEvent.change(inputDate, {target: {value: "06/27/2023"}});
  fireEvent.click(element);

  const checkTaskBox = screen.getByRole('checkbox');
  fireEvent.click(checkTaskBox);

  const check = screen.getByText(/You have no todo's left/i)
  expect(check).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i}); // i means case insensitive
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const element = screen.getByRole('button', {name: /Add/i});
 
  fireEvent.change(inputTask, {target: {value: "Walk the dog"}});
  fireEvent.change(inputDate, {target: {value: "06/27/2025"}});
  fireEvent.click(element);

  fireEvent.change(inputTask, {target: {value: "Dog the walk"}});
  fireEvent.change(inputDate, {target: {value: "06/27/2016"}});
  fireEvent.click(element);

  const walkDogCheck = screen.getByTestId(/Walk the dog/i).style.background;
  const dogWalkCheck = screen.getByTestId(/Dog the walk/i).style.background;
  expect (dogWalkCheck == walkDogCheck).toBe(false);
 });
