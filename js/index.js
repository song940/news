import { ready } from 'https://lsong.org/scripts/dom.js';
import { h, render, useState, useEffect, Panel, List, ListItem } from 'https://lsong.org/scripts/components/index.js';

// https://api.lsong.one:8443/zhihu/top_questions

const top_search = async () => {
  const response = await fetch(`https://api.lsong.org/zhihu/trending`);
  const data = await response.json();
  return data;
};

const top_questions = async () => {
  const response = await fetch(`https://api.lsong.org/zhihu/questions`);
  const data = await response.json();
  return data;
};

const ZhihuQuestion = ({ data: x }) => {
  return h('a', { className: 'zhihu-question', href: x.url },
    h('aside', null,
      h('h3', null, x.title),
      h('span', null, x.content),
    ),
    h('figure', null,
      // h('img', { src: x.children[0]?.thumbnail || x.target.author.avatar_url })
    )
  )
};

const App = () => {
  const [listA, setListA] = useState([]);
  const [listB, setListB] = useState([]);
  useEffect(() => {
    top_search().then(setListA);
    top_questions().then(setListB);
  }, []);
  return [
    h('h2', null, "Trending 🔥"),
    h('ol', null,
      listA.map(x => h('li', {}, h('a', { href: x.url }, x.title))),
    ),
    h('h2', null, "Questions"),
    h('ul', null,
      listB.map(x => h(ListItem, {}, h(ZhihuQuestion, { data: x }))),
    )
  ]
}

ready(() => {
  const app = document.getElementById('app');
  render(h(App), app);
});
