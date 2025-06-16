import { PrismaClient, TypeUser } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Étape 1 : Créer un typePartenaire
  const typePartenaire = await prisma.typePartner.create({
    data: {
      libelle: 'Super marché',
    },
  });

 
  // Étape 2 : Créer le partenaire associé
  const partner = await prisma.partner.create({
    data: {
      name: 'Technologie Abidjan SARL',
      typePartnerId: typePartenaire.id, // association avec l'objet précédent
      email: 'contact@techci.ci',
      adress: 'Cocody, Rue des Jardins',
      city: 'Abidjan',
      country: 'Côte d\'Ivoire',
      latitude: 5.3480,
      longitude: -4.0075,
    },
  });

   // Étape 3 : Hasher un mot de passe
  const hashedPassword = await bcrypt.hash('MotDePasseFort123!', 10);


  // Étape 4 : Créer le partenaire associé
  const user = await prisma.user.create({
    data: {
      name: 'Technologie Abidjan SARL',
      phone:'+225 0101030405',
      email: partner.email,
      password: hashedPassword,
      type_user: TypeUser.CLIENT,
      partnerId:partner.id

    },
  });

  console.log('✅ TypePartenaire créé :', typePartenaire);
  console.log('✅ Partenaire créé :', partner);
  console.log('✅ User créé :', user);

}

main()
  .catch((e) => {
    console.error('❌ Erreur de seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
