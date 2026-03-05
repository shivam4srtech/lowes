export function parseFaqs(html) {
  if (!html) return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const questions = doc.querySelectorAll(".faq_question");
  const answers = doc.querySelectorAll(".faq_answer");

  const faqs = [];

  questions.forEach((q, index) => {
    faqs.push({
      question: q.textContent.trim(),
      answer: answers[index]?.textContent.trim(),
    });
  });

  return faqs;
}