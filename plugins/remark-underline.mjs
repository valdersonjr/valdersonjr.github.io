// Markdown nunca padronizou sublinhado: o GFM tem ~~riscado~~, mas nada pro
// underline, porque o HTML já tinha <u>. Este plugin ensina o remark a ler
// `++texto++` e virar <u>texto</u>, que é como a notação de banco de dados marca
// a chave primária nos posts: LIVRO(++livro_id++, titulo).
//
// A varredura é feita à mão pra não depender de unist-util-visit.

const UNDERLINE = /\+\+(\S(?:[^+]*\S)?)\+\+/g;

/** Quebra um nó de texto em pedaços, trocando `++x++` por um nó sublinhado. */
function split(value) {
  UNDERLINE.lastIndex = 0;
  if (!UNDERLINE.test(value)) return null;
  UNDERLINE.lastIndex = 0;

  const nodes = [];
  let cursor = 0;
  let match;

  while ((match = UNDERLINE.exec(value)) !== null) {
    if (match.index > cursor) {
      nodes.push({ type: 'text', value: value.slice(cursor, match.index) });
    }
    nodes.push({
      // `emphasis` é um tipo que o mdast já conhece; o hName troca a tag <em>
      // por <u> na hora de virar HTML.
      type: 'emphasis',
      data: { hName: 'u' },
      children: [{ type: 'text', value: match[1] }],
    });
    cursor = match.index + match[0].length;
  }

  if (cursor < value.length) {
    nodes.push({ type: 'text', value: value.slice(cursor) });
  }
  return nodes;
}

export default function remarkUnderline() {
  return (tree) => walk(tree);
}

function walk(node) {
  if (!Array.isArray(node.children)) return;

  const out = [];
  let changed = false;

  for (const child of node.children) {
    if (child.type === 'text') {
      const parts = split(child.value);
      if (parts) {
        out.push(...parts);
        changed = true;
        continue;
      }
    } else {
      // `code` e `inlineCode` guardam o conteúdo em `value`, não em `children`,
      // então nunca entram aqui: o que está em bloco de código fica intacto.
      walk(child);
    }
    out.push(child);
  }

  if (changed) node.children = out;
}
