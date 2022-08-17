const parser = new DOMParser();

const customXml = `
  <list>
    <student>
      <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
    </student>
    <student>
      <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
      </name>
      <age>58</age>
      <prof>driver</prof>
    </student>
  </list>
`;

const domFromXml = parser.parseFromString(customXml, "text/xml");

const students = domFromXml.querySelectorAll("student");

function objectBuilder(stud) {
  const name = `${stud.querySelector("first").textContent} ${
    stud.querySelector("second").textContent
  }`;
  const age = `${stud.querySelector("age").textContent}`;
  const prof = `${stud.querySelector("prof").textContent}`;
  const lang = `${stud.querySelector("name").getAttribute("lang")}`;

  return {
    name,
    age: parseInt(age),
    prof,
    lang,
  };
}

for (let student of students) {
  console.log(objectBuilder(student));
}
