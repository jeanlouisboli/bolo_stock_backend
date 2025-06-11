import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Étape 1 : Créer un typePartenaire
  const typePartenaire = await prisma.typePartenaire.create({
    data: {
      libelle: 'Super marché',
    },
  });

  // Étape 2 : Hasher un mot de passe
  const hashedPassword = await bcrypt.hash('MotDePasseFort123!', 10);

  // Étape 3 : Créer le partenaire associé
  const partenaire = await prisma.partenaire.create({
    data: {
      name: 'Technologie Abidjan SARL',
      typePartenaireId: typePartenaire.id, // association avec l'objet précédent
      email: 'contact@techci.ci',
      adresse: 'Cocody, Rue des Jardins',
      ville: 'Abidjan',
      pays: 'Côte d\'Ivoire',
      username: 'contact@techci.ci',
      password: hashedPassword,
      latitude: 5.3480,
      longitude: -4.0075,
    },
  });

  console.log('✅ TypePartenaire créé :', typePartenaire);
  console.log('✅ Partenaire créé :', partenaire);
}

main()
  .catch((e) => {
    console.error('❌ Erreur de seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
