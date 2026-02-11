import SectionTitle from '@/components/SectionTitle';
import CourseCard from '@/components/CourseCard';
import { valentineMenu } from '@/data/menu';

export default function ValentinePage() {
  return (
    <section className="content-section" style={{ paddingTop: '6rem' }}>
      <SectionTitle title="Valentine's Italian Evening" sub="February 14, 2026 · Five Courses · For Two" />

      {valentineMenu.map((course, i) => (
        <CourseCard key={i} {...course} />
      ))}
    </section>
  );
}
