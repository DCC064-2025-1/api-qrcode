// prisma/seed.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Students
  const student1 = await prisma.user.create({
    data: {
      id: 'u1',
      matricula: 'A001',
      name: 'João Silva',
      password: '123456',
      role: 'STUDENT',
      student: { create: {} }
    },
    include: { student: true } // <- importante se você quiser usar student.id depois
  });

  const student2 = await prisma.user.create({
    data: {
      id: 'u2',
      matricula: 'A002',
      name: 'Maria Souza',
      password: '123456',
      role: 'STUDENT',
      student: { create: {} }
    },
    include: { student: true }
  });

  const student3 = await prisma.user.create({
    data: {
      id: 'u3',
      matricula: 'A003',
      name: 'Pedro Lima',
      password: '123456',
      role: 'STUDENT',
      student: { create: {} }
    },
    include: { student: true }
  });

  // Teachers (inclui teacher no retorno)
  const teacher1 = await prisma.user.create({
    data: {
      id: 'u4',
      matricula: 'P001',
      name: 'Prof. Carlos',
      password: '123456',
      role: 'TEACHER',
      teacher: { create: {} }
    },
    include: { teacher: true } // <- aqui garante que teacher1.teacher exista
  });

  const teacher2 = await prisma.user.create({
    data: {
      id: 'u5',
      matricula: 'P002',
      name: 'Prof. Ana',
      password: '123456',
      role: 'TEACHER',
      teacher: { create: {} }
    },
    include: { teacher: true }
  });

  // Cursos conectados aos teachers recém-criados
  const course1 = await prisma.course.create({
    data: {
      id: 'c1',
      name: 'Matemática Básica',
      teacher: { connect: { id: teacher1.teacher.id } } // agora teacher1.teacher.id existe
    }
  });

  const course2 = await prisma.course.create({
    data: {
      id: 'c2',
      name: 'Introdução à Programação',
      teacher: { connect: { id: teacher2.teacher.id } }
    }
  });

  console.log('✅ Seed finalizado');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
