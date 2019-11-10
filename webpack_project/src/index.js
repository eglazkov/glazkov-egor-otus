import React from 'react';
import {render} from 'react-dom';

import todoHeader from './user'; //.ts-скрипт компилируемый через @babel/preset-typescript, содержит заголовок приложения
let input;
let todoList = [];

const renderTodoList = (list) => {
    render(TodoApp({todoList: list}), document.getElementById("root"));
};

const action = (actionType, list) => {
    switch (actionType) {
        case 'ALL':
            renderTodoList(list);
            break;
        case 'ACTIVE':
            renderTodoList(list.filter(item => item.isCompleted === false));
            break;
        case 'COMPLETED':
            renderTodoList(list.filter(item => item.isCompleted === true));
            break;
        default:
            renderTodoList(list);
            break;
    }
};

const TodoApp = ({todoList}) =>( //jsx-верстка react-приложения, использование state исключено намеренно (требуется описать простое приложение без state)
    <div>
        <h1>{'Todo App'}</h1>
        <h3>{todoHeader}</h3>
        <form onSubmit={e => {
            e.preventDefault();
            if(!input.value.trim()){
                return;
            }
            todoList.push({value: input.value, isCompleted: false});
            input.value = '';
            window.todoList = todoList;
            render(TodoApp({todoList: todoList}), document.getElementById("root"));
        }}>
            <input ref={node => input = node}/>
            <button type="submit">
                {'Add Todo'}
            </button>
        </form>
        <div>
            <ul>
                {todoList && todoList.map( (item, index) =>
                  <div key={index}>
                      <li onClick={() => {
                          todoList[index].isCompleted = !item.isCompleted;                          
                          renderTodoList(todoList);
                      }} style={{textDecoration: item.isCompleted ? 'line-through' : null}}>{item.value}</li>
                  </div>)}
            </ul>
        </div>
        <div>
            <span>Show: </span>
            <button style={{marginLeft: '4px'}} onClick={()=>action('ALL', window.todoList)}>
                All
            </button>
            <button style={{marginLeft: '4px'}} onClick={()=>action('ACTIVE', window.todoList)}>
                Active
            </button>
            <button style={{marginLeft: '4px'}} onClick={()=>action('COMPLETED', window.todoList)}>
                Competed
            </button>
        </div>
    </div>
);

renderTodoList(todoList);
