import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createReview = async (data: {
  comment?: string;
  relatedPlaceId: number;
  customerName: string;
  viewed: boolean;
  roomNo: string;
  reviewRating: [
    {
      reviewSubjectId: number;
      score: number;
    }
  ];
}) => {
  const review = await prisma.review.create({
    data: {
      comment: data.comment,
      relatedPlace: {
        connect: {
          id: data.relatedPlaceId,
        },
      },
      customerName: data.customerName,
      viewed: data.viewed,
      roomNo: data.roomNo,
    },
  });

  // Create related review ratings separately
  await Promise.all(
    data.reviewRating.map((rating) =>
      prisma.reviewRating.create({
        data: {
          score: rating.score,
          reviewSubject: { connect: { id: rating.reviewSubjectId } },
          review: { connect: { id: review.id } },
        },
      })
    )
  );

  return review;
};

export const getReviews = async () => {
  return await prisma.review.findMany({
    include: {
      relatedPlace: true,
      reviewRating: {
        include: {
          reviewSubject: true,
        },
      },
    },
  });
};

export const getReviewById = async (id: number) => {
  return await prisma.review.findUnique({
    where: { id },
    include: {
      relatedPlace: true,
      reviewRating: {
        include: {
          reviewSubject: true,
        },
      },
    },
  });
};

export const updateReview = async (
  id: number,
  data: {
    viewed: boolean;
    roomNo?: string;
  }
) => {
  return await prisma.review.update({
    where: { id },
    data: {
      viewed: data.viewed,
      roomNo: data.roomNo,
    },
  });
};

export const deleteReview = async (id: number) => {
  try {
    await prisma.reviewRating.deleteMany({
      where: {
        reviewId: id,
      },
    });
  } catch (error) {
    return error;
  }
  return await prisma.review.delete({
    where: { id },
  });
};
