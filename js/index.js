import { ready } from 'https://lsong.org/scripts/dom.js';
import { h, render, useState, useEffect, Panel, List, ListItem } from 'https://lsong.org/scripts/components/index.js';

// https://api.lsong.one:8443/zhihu/top_questions

const top_search = async () => {
  const response = await fetch(`https://api.lsong.one:8443/zhihu/top_search`);
  const data = await response.json();
  return data.top_search.words;
};

const top_questions = async () => {
  const response = await fetch(`https://api.lsong.one:8443/zhihu/top_questions`);
  const data = await response.json();
  return data.data;
};

const ZhihuQuestion = ({ data: x }) => {
  return h('a', { className: 'zhihu-question', href: `https://www.zhihu.com/question/${x.target.id}` },
    h('aside', null,
      h('h3', null, x.target.title),
      h('span', null, x.detail_text),
    ),
    h('figure', null,
      h('img', { src: x.children[0]?.thumbnail || x.target.author.avatar_url })
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
    h('h2', null, "Hot 🔥"),
    h('ol', null,
      listA.map(x => h('li', {}, h('a', { href: `https://www.zhihu.com/search?q=${x.query}` }, x.display_query))),
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
