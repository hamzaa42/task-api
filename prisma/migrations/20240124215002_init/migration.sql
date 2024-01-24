-- CreateTable
CREATE TABLE "User" (
    "UserID" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Account" (
    "AccountID" SERIAL NOT NULL,
    "Balance" DOUBLE PRECISION NOT NULL,
    "AccountType" TEXT NOT NULL,
    "UserID" INTEGER NOT NULL,
    "Timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("AccountID")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "TransactionID" SERIAL NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "TransactionType" TEXT NOT NULL,
    "Timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "AccountID" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("TransactionID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Username_key" ON "User"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_AccountID_fkey" FOREIGN KEY ("AccountID") REFERENCES "Account"("AccountID") ON DELETE RESTRICT ON UPDATE CASCADE;
