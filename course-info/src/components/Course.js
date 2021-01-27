import React from 'react';

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  // One Method
  // const total = course.parts
  //   .map((part) => part.exercises)
  //   .reduce((acc, next) => acc + next);
  const total = course.parts.reduce((acc, next) => acc + next.exercises, 0);
  return <p>Number of exercises {total}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((courseData) => (
        <Part key={courseData.id} part={courseData} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
