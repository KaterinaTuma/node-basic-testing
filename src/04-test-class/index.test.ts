import { getBankAccount } from '.';
import { InsufficientFundsError } from '.';
import { TransferFailedError } from '.';
import { SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    const balance = account.getBalance();
    const expextedBalance = 100;
    expect(balance).toBe(expextedBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);
    const attemptOverdraw = () => account.withdraw(200);
    expect(attemptOverdraw).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(100);
    const attemptOvertransfer = () => account1.transfer(200, account2);
    expect(attemptOvertransfer).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    const attemptSelfTransfer = () => account.transfer(200, account);
    expect(attemptSelfTransfer).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(200);
    const balance = account.getBalance();
    const expectedBalance = 300;
    expect(balance).toBe(expectedBalance);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(40);
    const balance = account.getBalance();
    const expectedBalance = 60;
    expect(balance).toBe(expectedBalance);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(0);
    account1.transfer(100, account2);
    const expectedBalance1 = 0;
    const expectedBalance2 = 100;
    expect(account1.getBalance()).toBe(expectedBalance1);
    expect(account2.getBalance()).toBe(expectedBalance2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const result = await account.fetchBalance();
    if (result !== null) {
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    account.fetchBalance = async () => 42;
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(42);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    account.fetchBalance = async () => null;
    await expect(account.synchronizeBalance()).rejects.toBeInstanceOf(
      SynchronizationFailedError,
    );
  });
});
