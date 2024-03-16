"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var permissionless_1 = require("permissionless");
var pimlico_1 = require("permissionless/actions/pimlico");
var viem_1 = require("viem");
var chains_1 = require("viem/chains");
var safe_ts_1 = require("./utils/safe.ts");
var safe_ts_2 = require("./utils/safe.ts");
var multiSignerSafes_ts_1 = require("./multiSignerSafes.ts");
dotenv_1.default.config();
var entryPointAddress = process.env.PIMLICO_ENTRYPOINT_ADDRESS;
var multiSendAddress = process.env.PIMLICO_MULTISEND_ADDRESS;
var saltNonce = BigInt(process.env.PIMLICO_NONCE);
var chain = process.env.PIMLICO_CHAIN;
var chainID = Number(process.env.PIMLICO_CHAIN_ID);
var safeVersion = process.env.SAFE_VERSION;
var rpcURL = process.env.PIMLICO_RPC_URL;
var policyID = process.env.PIMLICO_GAS_POLICY;
var apiKey = process.env.PIMLICO_API_KEY;
var erc20PaymasterAddress = process.env.PIMLICO_ERC20_PAYMASTER_ADDRESS;
var usdcTokenAddress = process.env.PIMLICO_USDC_TOKEN_ADDRESS;
// Main function to perform operations
function proposeSafe(signerAddresses) {
  return __awaiter(this, void 0, void 0, function () {
    var numSigners,
      owners,
      threshold,
      safeAddresses,
      chainAddresses,
      bundlerClient,
      publicClient,
      pimlicoPaymasterClient,
      initCode,
      senderAddress,
      contractCode,
      newNonce,
      txCallData,
      sponsoredUserOperation,
      gasEstimate,
      maxGasPriceResult,
      sponsorResult;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          numSigners = signerAddresses.length;
          // Check if inputs are valid numbers
          if (isNaN(numSigners)) {
            console.log("Please enter valid numbers.");
            process.exit(0);
          }
          owners = signerAddresses;
          threshold = BigInt(numSigners);
          safeAddresses = safe_ts_1.SAFE_ADDRESSES_MAP[safeVersion];
          if (safeAddresses) {
            chainAddresses = safeAddresses[chainID];
          }
          if (chain == "mumbai") {
            bundlerClient = (0, viem_1.createClient)({
              transport: (0, viem_1.http)(
                "https://api.pimlico.io/v1/"
                  .concat(chain, "/rpc?apikey=")
                  .concat(apiKey)
              ),
              chain: chains_1.polygonMumbai,
            })
              .extend(
                (0, permissionless_1.bundlerActions)(
                  permissionless_1.ENTRYPOINT_ADDRESS_V06
                )
              )
              .extend(
                (0, pimlico_1.pimlicoBundlerActions)(
                  permissionless_1.ENTRYPOINT_ADDRESS_V06
                )
              );
            publicClient = (0, viem_1.createPublicClient)({
              transport: (0, viem_1.http)(rpcURL),
              chain: chains_1.polygonMumbai,
            });
            pimlicoPaymasterClient = (0, viem_1.createClient)({
              transport: (0, viem_1.http)(
                "https://api.pimlico.io/v2/"
                  .concat(chain, "/rpc?apikey=")
                  .concat(apiKey)
              ),
              chain: chains_1.polygonMumbai,
            }).extend(
              (0, pimlico_1.pimlicoPaymasterActions)(
                permissionless_1.ENTRYPOINT_ADDRESS_V06
              )
            );
          } else {
            throw new Error(
              "Current code only support limited networks. Please make required changes if you want to use custom network."
            );
          }
          return [
            4 /*yield*/,
            (0, multiSignerSafes_ts_1.multiGetAccountInitCode)({
              owners: owners,
              threshold: threshold,
              addModuleLibAddress: chainAddresses.ADD_MODULES_LIB_ADDRESS,
              safe4337ModuleAddress: chainAddresses.SAFE_4337_MODULE_ADDRESS,
              safeProxyFactoryAddress:
                chainAddresses.SAFE_PROXY_FACTORY_ADDRESS,
              safeSingletonAddress: chainAddresses.SAFE_SINGLETON_ADDRESS,
              saltNonce: saltNonce,
              multiSendAddress: multiSendAddress,
              erc20TokenAddress: usdcTokenAddress,
              paymasterAddress: erc20PaymasterAddress,
            }),
          ];
        case 1:
          initCode = _a.sent();
          console.log("\nInit Code Created.", initCode);
          return [
            4 /*yield*/,
            (0, multiSignerSafes_ts_1.multiGetAccountAddress)({
              client: publicClient,
              owners: owners,
              threshold: threshold,
              addModuleLibAddress: chainAddresses.ADD_MODULES_LIB_ADDRESS,
              safe4337ModuleAddress: chainAddresses.SAFE_4337_MODULE_ADDRESS,
              safeProxyFactoryAddress:
                chainAddresses.SAFE_PROXY_FACTORY_ADDRESS,
              safeSingletonAddress: chainAddresses.SAFE_SINGLETON_ADDRESS,
              saltNonce: saltNonce,
              multiSendAddress: multiSendAddress,
              erc20TokenAddress: usdcTokenAddress,
              paymasterAddress: erc20PaymasterAddress,
            }),
          ];
        case 2:
          senderAddress = _a.sent();
          console.log(
            "\nCounterfactual Sender Address Created:",
            senderAddress
          );
          console.log(
            "Address Link: https://mumbai.polygonscan.com/address/" +
              senderAddress
          );
          return [
            4 /*yield*/,
            publicClient.getBytecode({
              address: senderAddress,
            }),
          ];
        case 3:
          contractCode = _a.sent();
          if (contractCode) {
            console.log("\nThe Safe is already deployed.");
            process.exit(0);
          } else {
            console.log(
              "\nDeploying a new Safe and executing calldata passed with it (if any)."
            );
          }
          return [
            4 /*yield*/,
            (0, permissionless_1.getAccountNonce)(publicClient, {
              entryPoint: permissionless_1.ENTRYPOINT_ADDRESS_V06,
              sender: senderAddress,
            }),
          ];
        case 4:
          newNonce = _a.sent();
          txCallData = (0, safe_ts_2.encodeCallData)({
            to: "0x6EE6DEAC2eB4a7753381cbcdbD33eda1A243E777",
            data: "0xe8927fbc",
            value: 0n,
          });
          sponsoredUserOperation = {
            sender: senderAddress,
            nonce: newNonce,
            initCode: contractCode ? "0x" : initCode,
            callData: txCallData,
            callGasLimit: 1n, // All Gas Values will be filled by Estimation Response Data.
            verificationGasLimit: 1n,
            preVerificationGas: 1n,
            maxFeePerGas: 1n,
            maxPriorityFeePerGas: 1n,
            paymasterAndData: erc20PaymasterAddress,
            signature: "0x",
          };
          return [
            4 /*yield*/,
            bundlerClient.estimateUserOperationGas({
              userOperation: sponsoredUserOperation,
            }),
          ];
        case 5:
          gasEstimate = _a.sent();
          return [4 /*yield*/, bundlerClient.getUserOperationGasPrice()];
        case 6:
          maxGasPriceResult = _a.sent();
          sponsoredUserOperation.callGasLimit = gasEstimate.callGasLimit;
          sponsoredUserOperation.verificationGasLimit =
            gasEstimate.verificationGasLimit;
          sponsoredUserOperation.preVerificationGas =
            gasEstimate.preVerificationGas;
          sponsoredUserOperation.maxFeePerGas =
            maxGasPriceResult.fast.maxFeePerGas;
          sponsoredUserOperation.maxPriorityFeePerGas =
            maxGasPriceResult.fast.maxPriorityFeePerGas;
          return [
            4 /*yield*/,
            pimlicoPaymasterClient.sponsorUserOperation({
              userOperation: sponsoredUserOperation,
              sponsorshipPolicyId: policyID,
            }),
          ];
        case 7:
          sponsorResult = _a.sent();
          sponsoredUserOperation.callGasLimit = sponsorResult.callGasLimit;
          sponsoredUserOperation.verificationGasLimit =
            sponsorResult.verificationGasLimit;
          sponsoredUserOperation.preVerificationGas =
            sponsorResult.preVerificationGas;
          sponsoredUserOperation.paymasterAndData =
            sponsorResult.paymasterAndData;
          return [2 /*return*/, sponsoredUserOperation];
      }
    });
  });
}
export default proposeSafe;
