import {
  // Level,
  PrismaClient,
  Role,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    // COACHES (6)
    {
      role: Role.COACH,
      login: 'ivanov_coach',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'ivanov.coach@sportschool.ru',
      phone: '+79001234501',
      firstname: 'Александр',
      surname: 'Иванов',
      middlename: 'Петрович',
    },
    {
      role: Role.COACH,
      login: 'petrova_e',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'petrova.elena@sportschool.ru',
      phone: '+79001234502',
      firstname: 'Елена',
      surname: 'Петрова',
      middlename: 'Сергеевна',
    },
    {
      role: Role.COACH,
      login: 'kuznetsov_m',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'kuznetsov.m@sportschool.ru',
      phone: '+79001234503',
      firstname: 'Михаил',
      surname: 'Кузнецов',
      middlename: 'Андреевич',
    },
    {
      role: Role.COACH,
      login: 'volkova_n',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'volkova.n@sportschool.ru',
      phone: '+79001234504',
      firstname: 'Наталья',
      surname: 'Волкова',
      middlename: 'Дмитриевна',
    },
    {
      role: Role.COACH,
      login: 'sokolov_d',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'sokolov.d@sportschool.ru',
      phone: '+79001234505',
      firstname: 'Дмитрий',
      surname: 'Соколов',
      middlename: 'Александрович',
    },
    {
      role: Role.COACH,
      login: 'morozova_a',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'morozova.a@sportschool.ru',
      phone: '+79001234506',
      firstname: 'Анна',
      surname: 'Морозова',
      middlename: 'Владимировна',
    },

    // PARENTS (10)
    {
      role: Role.PARENT,
      login: 'smirnova_m',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'smirnova.m@mail.ru',
      phone: '+79001234507',
      firstname: 'Марина',
      surname: 'Смирнова',
      middlename: 'Игоревна',
    },
    {
      role: Role.PARENT,
      login: 'kozlov_v',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'kozlov.v@mail.ru',
      phone: '+79001234508',
      firstname: 'Владимир',
      surname: 'Козлов',
      middlename: 'Сергеевич',
    },
    {
      role: Role.PARENT,
      login: 'novikova_o',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'novikova.o@mail.ru',
      phone: '+79001234509',
      firstname: 'Ольга',
      surname: 'Новикова',
      middlename: 'Александровна',
    },
    {
      role: Role.PARENT,
      login: 'vasiliev_i',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'vasiliev.i@mail.ru',
      phone: '+79001234510',
      firstname: 'Игорь',
      surname: 'Васильев',
      middlename: 'Петрович',
    },
    {
      role: Role.PARENT,
      login: 'fedorova_t',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'fedorova.t@mail.ru',
      phone: '+79001234511',
      firstname: 'Татьяна',
      surname: 'Федорова',
      middlename: 'Михайловна',
    },
    {
      role: Role.PARENT,
      login: 'andreev_s',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'andreev.s@mail.ru',
      phone: '+79001234512',
      firstname: 'Сергей',
      surname: 'Андреев',
      middlename: 'Николаевич',
    },
    {
      role: Role.PARENT,
      login: 'dmitrieva_l',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'dmitrieva.l@mail.ru',
      phone: '+79001234513',
      firstname: 'Людмила',
      surname: 'Дмитриева',
      middlename: 'Владимировна',
    },
    {
      role: Role.PARENT,
      login: 'zaitsev_r',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'zaitsev.r@mail.ru',
      phone: '+79001234514',
      firstname: 'Роман',
      surname: 'Зайцев',
      middlename: 'Андреевич',
    },
    {
      role: Role.PARENT,
      login: 'grigorieva_k',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'grigorieva.k@mail.ru',
      phone: '+79001234515',
      firstname: 'Ксения',
      surname: 'Григорьева',
      middlename: 'Дмитриевна',
    },
    {
      role: Role.PARENT,
      login: 'belov_a',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'belov.a@mail.ru',
      phone: '+79001234516',
      firstname: 'Антон',
      surname: 'Белов',
      middlename: 'Игоревич',
    },

    // CHILDREN (10)
    // {
    //   role: Role.CHILDREN,
    //   login: 'smirnov_d',
    //   password: 'password139',
    //   email: 'smirnov.d@gmail.com',
    //   phone: '+79001234517',
    //   firstname: 'Даниил',
    //   surname: 'Смирнов',
    //   middlename: 'Владимирович',
    // },
    // {
    //   role: Role.CHILDREN,
    //   login: 'kozlova_v',
    //   password: 'password140',
    //   email: 'kozlova.v@gmail.com',
    //   phone: '+79001234518',
    //   firstname: 'Валерия',
    //   surname: 'Козлова',
    //   middlename: 'Сергеевна',
    // },
    // {
    //   role: Role.CHILDREN,
    //   login: 'novikov_m',
    //   password: 'password141',
    //   email: 'novikov.m@gmail.com',
    //   phone: '+79001234519',
    //   firstname: 'Максим',
    //   surname: 'Новиков',
    //   middlename: 'Александрович',
    // },
    // {
    //   role: Role.CHILDREN,
    //   login: 'vasilieva_s',
    //   password: 'password142',
    //   email: 'vasilieva.s@gmail.com',
    //   phone: '+79001234520',
    //   firstname: 'София',
    //   surname: 'Васильева',
    //   middlename: 'Игоревна',
    // },
    // {
    //   role: Role.CHILDREN,
    //   login: 'fedorov_a',
    //   password: 'password143',
    //   email: 'fedorov.a@gmail.com',
    //   phone: '+79001234521',
    //   firstname: 'Артём',
    //   surname: 'Федоров',
    //   middlename: 'Михайлович',
    // },
    // {
    //   role: Role.CHILDREN,
    //   login: 'andreeva_p',
    //   password: 'password144',
    //   email: 'andreeva.p@gmail.com',
    //   phone: '+79001234522',
    //   firstname: 'Полина',
    //   surname: 'Андреева',
    //   middlename: 'Сергеевна',
    // },
    // {
    //   role: Role.CHILDREN,
    //   login: 'dmitriev_i',
    //   password: 'password145',
    //   email: 'dmitriev.i@gmail.com',
    //   phone: '+79001234523',
    //   firstname: 'Иван',
    //   surname: 'Дмитриев',
    //   middlename: 'Романович',
    // },
    // {
    //   role: Role.CHILDREN,
    //   login: 'zaitseva_e',
    //   password: 'password146',
    //   email: 'zaitseva.e@gmail.com',
    //   phone: '+79001234524',
    //   firstname: 'Екатерина',
    //   surname: 'Зайцева',
    //   middlename: 'Андреевна',
    // },
    // {
    //   role: Role.CHILDREN,
    //   login: 'grigoriev_k',
    //   password: 'password147',
    //   email: 'grigoriev.k@gmail.com',
    //   phone: '+79001234525',
    //   firstname: 'Кирилл',
    //   surname: 'Григорьев',
    //   middlename: 'Дмитриевич',
    // },
    // {
    //   role: Role.CHILDREN,
    //   login: 'belova_m',
    //   password: 'password148',
    //   email: 'belova.m@gmail.com',
    //   phone: '+79001234526',
    //   firstname: 'Мария',
    //   surname: 'Белова',
    //   middlename: 'Антоновна',
    // },

    // MANAGERS (2)
    {
      role: Role.MANAGER,
      login: 'popov_manager',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'popov.manager@sportschool.ru',
      phone: '+79001234527',
      firstname: 'Андрей',
      surname: 'Попов',
      middlename: 'Викторович',
    },
    {
      role: Role.MANAGER,
      login: 'orlova_manager',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'orlova.manager@sportschool.ru',
      phone: '+79001234528',
      firstname: 'Светлана',
      surname: 'Орлова',
      middlename: 'Павловна',
    },

    // SUPER (2)
    {
      role: Role.SUPER,
      login: 'admin_main',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'admin.main@sportschool.ru',
      phone: '+79001234529',
      firstname: 'Евгений',
      surname: 'Королев',
      middlename: 'Максимович',
    },
    {
      role: Role.SUPER,
      login: 'admin_deputy',
      password: '$2a$05$j.Bp2u5VNMh3bcAl/b9TjeEsnpdr3GOO//H6Ixy0K3wdlhNvIeKFm',
      email: 'admin.deputy@sportschool.ru',
      phone: '+79001234530',
      firstname: 'Ирина',
      surname: 'Соловьева',
      middlename: 'Алексеевна',
    },
  ];

  const branches = [
    {
      name: '1-й Верхний пер., 2',
      location: '60.054826, 30.379982',
      workingStart: '10:00',
      workingEnd: '22:00',
      contactPhone: '+79996661337',
      contactEmail: 'verh-pereulok@nevsky-bears.ru',
      photos: [],
    },
    {
      name: 'ш. Революции, 84АБ',
      location: '59.963156, 30.457883',
      workingStart: '09:00',
      workingEnd: '21:00',
      contactPhone: '+79996661338',
      contactEmail: 'revol-highway@nevsky-bears.ru',
      photos: [
        'https://avatars.mds.yandex.net/get-altay/5448678/2a0000017d380ed520715939ff36c2a5efe0/L_height',
      ],
    },
    {
      name: 'просп. Динамо, 44',
      location: '59.968079, 30.265652',
      workingStart: '08:00',
      workingEnd: '20:00',
      contactPhone: '+79996661339',
      contactEmail: 'dynamo-prosp@nevsky-bears.ru',
      photos: [
        'https://avatars.mds.yandex.net/get-altay/10963815/2a0000018dead45e5a04d663321f14562b45/L_height',
      ],
    },
    {
      name: 'пер. Челиева, 13В',
      location: '59.889178, 30.477655',
      workingStart: '08:00',
      workingEnd: '20:00',
      contactPhone: '+79996661339',
      contactEmail: 'dynamo-prosp@nevsky-bears.ru',
      photos: [
        'https://avatars.mds.yandex.net/get-altay/4379646/2a00000190cb6179799826ed4c580adb913f/L_height',
        'https://avatars.mds.yandex.net/get-altay/9686455/2a00000189a2fa6c49f764512aaa17124c26/L_height',
        'https://avatars.mds.yandex.net/get-altay/10350441/2a0000018deac27e8026e3f662553769062a/L_height',
        'https://avatars.mds.yandex.net/get-altay/10834132/2a0000018e0a843651a42e001100b8511f9b/L_height',
        'https://avatars.mds.yandex.net/get-altay/4699294/2a0000017b7c7706e33656bd36104e221904/L_height',
      ],
    },
  ];

  // const trainingSessions = [];

  // const levels = [Level.BEGINNER, Level.INTERMEDIATE, Level.ADVANCED];
  // const baseDate = new Date('2025-02-12T14:00:00Z');

  // for (let i = 0; i < 3000; i++) {
  //   const currentDate = new Date(baseDate);
  //   currentDate.setDate(baseDate.getDate() + Math.floor(i / 3));

  //   trainingSessions.push({
  //     groupLevel: levels[i % 3],
  //     startDate: new Date(currentDate.getTime() + (i % 3) * 3 * 60 * 60 * 1000),
  //     endDate: new Date(
  //       currentDate.getTime() + ((i % 3) * 3 + 2) * 60 * 60 * 1000,
  //     ),
  //     branchId: 8,
  //     coachId: 134,
  //   });
  // }

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  await prisma.branch.createMany({
    data: branches,
    skipDuplicates: true,
  });

  // await prisma.trainingSession.createMany({
  //   data: trainingSessions,
  //   skipDuplicates: true,
  // });

  console.log('Seeded.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
