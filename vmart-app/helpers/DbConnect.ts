import prisma from './Prisma';

const ConnectDb = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to DB.');
  } catch (e) {
    const err = e as Error;
    console.log('Something went wrong. Failed to connect to DB.', err?.message);
  } finally {
    await prisma.$disconnect();
    console.log('Connection closed.');
  }
};

export default ConnectDb;
