import Link from 'next/link';
import NewsList from '@/components/news-list';
import { getAvailableNewsMonths, getAvailableNewsYears } from '@/lib/news';
import { getNewsForYear } from '@/lib/news';

export default function FilteredNewsPage({ params }) {
  const filter = params.filter || [];
  const selectedYear = filter[0];
  const selectedMonth = filter[1];
  
  let news = [];
  let links = getAvailableNewsYears();
  
  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = getAvailableNewsMonths(selectedYear, selectedMonth);
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  // 필터가 유효하지 않으면 오류를 발생시킴
  if (
    (selectedYear && !getAvailableNewsYears().includes(selectedYear)) ||
    (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(selectedMonth))
  ) {
    throw new Error('Invalid filter.');
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;

              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
}
