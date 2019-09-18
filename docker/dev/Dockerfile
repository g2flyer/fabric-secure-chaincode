# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0

FROM fabric-private-chaincode/base:latest

ARG OPENSSL=1.1.0j
ARG SGXSSL=v2.4.1
ARG NANOPB_VERSION=0.3.9.2
ARG FABRIC_VERSION=1.4.2

# Install SGX SSL
WORKDIR /tmp
ENV SGX_SSL /opt/intel/sgxssl
RUN wget https://www.openssl.org/source/openssl-$OPENSSL.tar.gz \
 && git clone  --branch $SGXSSL https://github.com/intel/intel-sgx-ssl.git \
 && . $SGX_SDK/environment \
 && (cd intel-sgx-ssl/openssl_source; mv /tmp/openssl-$OPENSSL.tar.gz . ) \
 && (cd intel-sgx-ssl/Linux; make SGX_MODE=SIM DESTDIR=$SGX_SSL all test ) \
 && (cd intel-sgx-ssl/Linux; make install ) \
 && rm -rf /tmp/intel-sgx-ssl

# Install nanopb
ENV NANOPB_PATH=/usr/local/nanopb/
RUN git clone https://github.com/nanopb/nanopb.git $NANOPB_PATH \
 && cd $NANOPB_PATH \
 && git checkout nanopb-$NANOPB_VERSION \
 && cd generator/proto \
 && make

# Get Fabric
ENV FABRIC_PATH=$GOPATH/src/github.com/hyperledger/fabric
RUN git clone --branch v$FABRIC_VERSION https://github.com/hyperledger/fabric.git $FABRIC_PATH

# Get FPC
ENV FPC_PATH=$GOPATH/src/github.com/hyperledger-labs/fabric-private-chaincode
RUN git clone https://github.com/hyperledger-labs/fabric-private-chaincode $FPC_PATH

WORKDIR $FPC_PATH

# NOTE: remove hexdump line from common/enclave/generate_mrenclave.sh as this is not installed
